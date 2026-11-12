import { Featuresjob } from "@/components/home/Featuresjob";
import { JobsPage } from "@/components/home/Jobs";
import { Pricing } from "@/components/home/Pricing";
import Banner from "@/components/home/banner";
import { Yournextrole } from "@/components/home/Yournextrole";

export default function Home() {
  return (
    <>
      <Banner />
      <JobsPage />
      <Featuresjob/>
      <Pricing/>
      <Yournextrole/>
    </>
  );
}
