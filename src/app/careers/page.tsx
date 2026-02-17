import { NextJsModuleWrapper } from "@/components/wrappers/NextJsModuleWrapper";

export default function CareersPage() {
  return (
    <NextJsModuleWrapper
      moduleName="KodNest Careers"
      modulePath="kodnest-careers"
      description="Job tracking and notification system"
      repoUrl="https://github.com/MohammedOmerKhan01/kodnest-careers"
      devPort={3000}
    />
  );
}
