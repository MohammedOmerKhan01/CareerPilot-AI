import { DeployedModuleWrapper } from "@/components/wrappers/DeployedModuleWrapper";

export default function ReadinessPage() {
  return (
    <DeployedModuleWrapper
      moduleName="Placement Readiness"
      deployedUrl={process.env.NEXT_PUBLIC_READINESS_URL || ""}
      description="JD analysis, readiness scoring, and preparation system - Analyze job descriptions and assess your readiness"
      repoUrl="https://github.com/MohammedOmerKhan01/Placement-Readiness-Platform"
    />
  );
}
