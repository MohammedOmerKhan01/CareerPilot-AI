import { DeployedModuleWrapper } from "@/components/wrappers/DeployedModuleWrapper";

export default function ResumePage() {
  return (
    <DeployedModuleWrapper
      moduleName="AI Resume Builder"
      deployedUrl={process.env.NEXT_PUBLIC_RESUME_URL || ""}
      description="ATS-optimized resume builder with templates - Create professional resumes with AI assistance"
      repoUrl="https://github.com/MohammedOmerKhan01/AI-Resume-Builder"
    />
  );
}
