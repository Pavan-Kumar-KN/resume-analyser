import ResumeCard from "~/components/ResumeCard";
// import { resumes } from "../../constants/index";
import type { Route } from "./+types/home";
import Navbar from '~/components/Navbar';
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import puter from "@heyputer/puter.js";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DevResumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}


export default function Home() {
  const { isLoading , auth  , kv} = usePuterStore();
  // capturing the route when the user tries to access the private route
  const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
  
  useEffect(() =>{
    if(!auth.isAuthenticated){
      navigate( '/auth?next=/')
    }
  } , [auth.isAuthenticated])
  
  // useEffect(() =>{
  //     puter.ai.chat(`Why did the chicken cross the road?`).then((res) =>{
  //       console.log(res);
  //     });
  //   } , [])
  // 
  // 
  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);
  
  return <main className="bg-[url('/images/bg-main.svg')]">
    <Navbar />
    <section className="main-section py-16">
      <div className="page-heading">
          <h1>Track Your Applications & Resume Ratings</h1>
          <h2>Review your sumissions and chck AI-powered feedback</h2>
      </div>
    
    {resumes.length > 0 ?(   
      <div className="resumes-section">
        {
          resumes.map((resume : Resume) =>(
            <ResumeCard key={ resume.id} resume={resume} />
          ))
        }
      </div>
    ) : (
      <div className="resumes-section">
        <h2>No resumes found</h2>
      </div>
    )}
    </section>
   
  </main>;
}
