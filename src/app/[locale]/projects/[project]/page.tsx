import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectDetail from "./ProjectDetail";
import { getScrollModeCookie } from "@/app/scroll-mode";

type Params = {
  params: Promise<{
    locale: string;
    project: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { project, locale } = await params;

  const baseUrl = "https://portfolio-pearl-delta-44.vercel.app/en";

  const ogImageUrl = `${baseUrl}/open-graph/${project}/home.png`;

  const t = await getTranslations({
    locale,
    namespace: "ProjectsPage.projectList",
  });
  return {
    title: `${t(`${project}.title`)}`,
    description: t(`${project}.description`),
    openGraph: {
      title: `${t(`${project}.title`)} | Thanh Long`,
      description: t(`${project}.description`),
      url: `${baseUrl}/${locale}/projects/${project}`,
      siteName: "Avinash Yadav Portfolio",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      type: "article",
      authors: "Avinash Yadav",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Page({ params }: Params) {
  const { project } = await params;
  const modeScroll = await getScrollModeCookie();
  
  return <ProjectDetail project={project} modeScroll={modeScroll} />;
}
