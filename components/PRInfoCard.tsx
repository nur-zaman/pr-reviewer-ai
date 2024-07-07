import { PRChanges } from "@/actions/github";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AvatarIcon } from "@radix-ui/react-icons";
import {
  CalendarIcon,
  FileIcon,
  GitBranchIcon,
  GitCommitVerticalIcon,
  GitCompareIcon,
  GitPullRequestIcon,
} from "lucide-react";

export default function PRInfoCard({ prChanges }: { prChanges: PRChanges }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <GitPullRequestIcon className="w-6 h-6" />
          <CardTitle>Pull Request {prChanges.prNumber}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <h4 className="text-sm font-medium">Changed Files</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {prChanges.files.map((file) => (
                <li key={file.filename}>
                  <FileIcon className="w-4 h-4 mr-2" />
                  {file.filename}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
