import { DeployedModuleWrapper } from "@/components/wrappers/DeployedModuleWrapper";

export default function CareersPage() {
  return (
    <DeployedModuleWrapper
      moduleName="KodNest Careers"
      deployedUrl={process.env.NEXT_PUBLIC_CAREERS_URL || ""}
      description="Job tracking and notification system - Track applications, get notifications, and manage your job search"
      repoUrl="https://github.com/MohammedOmerKhan01/kodnest-careers"
    />
  );
}
