import Features from "@/components/ui/Features/Features";
import Hero from "@/components/ui/Hero";
import { getDictionary } from "@/get-dictionary";


export default async function Home({params: {lang}}) {

  const dictionary = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dictionary={dictionary?.hero}/>
      <Features lang={lang} dictionary={dictionary?.features}/>
    </>
  );
}
