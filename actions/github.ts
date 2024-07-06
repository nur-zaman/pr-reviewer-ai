"use server";

type FileChange = {
  filename: string;
  status: "added" | "removed" | "modified";
  beforeContent?: string | null;
  afterContent?: string | null;
};

type PRChanges = {
  repo: string;
  prNumber: number;
  files: FileChange[];
};

async function fetchWithAuth(url: string, params?: Record<string, string>) {
  const githubToken = process.env.GITHUB_TOKEN;

  if (!githubToken) {
    throw new Error("GitHub token not found in environment variables");
  }

  const urlWithParams = new URL(url);
  if (params) {
    Object.keys(params).forEach((key) =>
      urlWithParams.searchParams.append(key, params[key])
    );
  }

  const response = await fetch(urlWithParams.toString(), {
    headers: {
      "Authorization": `token ${githubToken}`,
      "Accept": "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}\n${errorBody}`
    );
  }

  return response.json();
}

async function getFileContent(
  repo: string,
  filePath: string,
  commitSha: string
): Promise<string | null> {
  try {
    const url = `https://api.github.com/repos/${repo}/contents/${filePath}`;
    const data = await fetchWithAuth(url, { ref: commitSha });
    return data.content
      ? Buffer.from(data.content, "base64").toString("utf-8")
      : null;
  } catch (error: any) {
    console.error(`Error fetching file content: ${error.message}`);
    return null;
  }
}

async function getPRInfo(
  repo: string,
  prNumber: number
): Promise<[string, string]> {
  try {
    const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}`;
    const prData = await fetchWithAuth(url);
    return [prData.base.sha, prData.head.sha];
  } catch (error: any) {
    console.error(`Error fetching PR info: ${error.message}`);
    throw error;
  }
}

async function getPRFiles(repo: string, prNumber: number): Promise<any[]> {
  try {
    const url = `https://api.github.com/repos/${repo}/pulls/${prNumber}/files`;
    return await fetchWithAuth(url);
  } catch (error: any) {
    console.error(`Error fetching PR files: ${error.message}`);
    throw error;
  }
}

export async function getPRFileChanges(
  repo: string,
  prNumber: number
): Promise<PRChanges> {
  "use server";

  console.log(`Fetching PR changes for repo: ${repo}, PR number: ${prNumber}`);

  try {
    const [baseSha, headSha] = await getPRInfo(repo, prNumber);
    console.log(`Base SHA: ${baseSha}, Head SHA: ${headSha}`);

    if (!baseSha || !headSha) {
      throw new Error("Failed to fetch PR information.");
    }

    const files = await getPRFiles(repo, prNumber);
    console.log(`Fetched ${files.length} files from PR`);

    const fileChanges: FileChange[] = await Promise.all(
      files.map(async (file: any) => {
        console.log(`Processing file: ${file.filename}`);
        const change: FileChange = {
          filename: file.filename,
          status: file.status as "added" | "removed" | "modified",
        };

        if (file.status === "added") {
          change.afterContent = await getFileContent(
            repo,
            file.filename,
            headSha
          );
        } else if (file.status === "removed") {
          change.beforeContent = await getFileContent(
            repo,
            file.filename,
            baseSha
          );
        } else {
          change.beforeContent = await getFileContent(
            repo,
            file.filename,
            baseSha
          );
          change.afterContent = await getFileContent(
            repo,
            file.filename,
            headSha
          );
        }

        return change;
      })
    );

    return {
      repo,
      prNumber,
      files: fileChanges,
    };
  } catch (error: any) {
    console.error(`Error in getPRFileChanges: ${error.message}`);
    throw error;
  }
}
