
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for internal navigation if needed, or use <a> for external
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"; // Import Card components
import { PlayCircle, Copy } from 'lucide-react'; // For video icon if needed, Copy for copy icon
import { useToast } from "@/hooks/use-toast"; // For toast notifications

const roles = ["Developer", "Canva Designer", "Content Writer", "Video Editor"];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // State for contact form inputs (no longer used for direct form submission)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');

  // State for character counts (no longer used)
  const [nameCount, setNameCount] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  // State for Gmail icon interaction
  const [showEmailDisplay, setShowEmailDisplay] = useState(false);
  const { toast } = useToast();


  useEffect(() => {
    let timeoutId;

    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      if (!isDeleting) {
        // Typing
        if (charIndex < currentRole.length) {
          setDisplayedRole(currentRole.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
          timeoutId = setTimeout(handleTyping, TYPING_SPEED);
        } else {
          // Finished typing, pause before deleting
          timeoutId = setTimeout(() => {
            setIsDeleting(true);
          }, PAUSE_DURATION);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayedRole(currentRole.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
          timeoutId = setTimeout(handleTyping, DELETING_SPEED);
        } else {
          // Finished deleting, move to the next role
          setIsDeleting(false);
          setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
          // Reset charIndex for the next role
          setCharIndex(0);
          // Start the next typing cycle
          timeoutId = setTimeout(handleTyping, TYPING_SPEED);
        }
      }
    };

    // Start the effect
    timeoutId = setTimeout(handleTyping, TYPING_SPEED);


    // Clear timeout on component unmount or when dependencies change
    return () => clearTimeout(timeoutId);

  }, [currentRoleIndex, isDeleting, charIndex]); // Dependencies updated


  const handleGmailIconClick = () => {
    setShowEmailDisplay(!showEmailDisplay);
  };

  const handleCopyEmail = async (emailToCopy) => {
    try {
      await navigator.clipboard.writeText(emailToCopy);
      toast({
        title: "Email Copied!",
        description: `${emailToCopy} has been copied to your clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy email: ', err);
      toast({
        title: "Copy Failed",
        description: `Could not copy ${emailToCopy} to clipboard. Please try again.`,
        variant: "destructive",
      });
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 px-4 bg-background text-foreground">
      {/* Profile Section */}
      <div id="about" className="text-center mb-12">
        {/* Flipping Card for Profile Image/Video */}
        <div
          className="flip-card-container w-48 h-48 mx-auto mb-6"onMouseEnter={() => setIsCardFlipped(true)}onMouseLeave={() => setIsCardFlipped(false)}
 onTouchEnd={() => { console.log('onTouchEnd', isCardFlipped, !isCardFlipped); setIsCardFlipped(!isCardFlipped); }}
>
          <div className={`flip-card ${isCardFlipped ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <Image
                src="/img/aimeya.jpg"
                alt="Anupriya Balasubramanian"
                width={192}
                height={192}
 style={{ height: 'auto', width: '100%' }}
                className="object-cover w-full h-full profile-image"
                data-ai-hint="profile woman"
                priority
              />
            </div>
            <div className="flip-card-back">
            <Image
                src="/img/anu2.jpg"
                alt="Anupriya Balasubramanian - Back"
                width={192}
                height={192}
 style={{ height: 'auto', width: '100%' }}
                className="object-cover w-full h-full profile-image"
                data-ai-hint="profile woman alternate"
              />
            </div>
          </div>
        </div>

         {/* Updated Introduction Paragraph */}
         <div className="text-lg md:text-xl mb-4 max-w-2xl mx-auto text-center">
            <p>
                I am <b>Anupriya Balasubramanian</b>.
            </p>
            {/* Typing Role Effect */}
            <p className="text-lg md:text-xl mb-8 h-7">
                I am a <span className="font-semibold typing-effect text-foreground">{displayedRole}</span>
            </p>
            <p>
                I have a strong passion for researching, learning, exploring, and documenting details.
                Most of my work revolves around writing and continuously acquiring new skills in writing and development. I obsessed with books and learning latest technologies.
            </p>
            <br />
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://persona-canvas.vercel.app/" target="_blank" rel="noopener noreferrer">Personal Canvas</a>
                </Button>
        </div>
      </div>


       {/* Social Links Section */}
       <div className="pt-16 text-center w-full max-w-4xl mx-auto mb-12">
           <div className="flex justify-center space-x-4 md:space-x-6">
            <a href="https://github.com/abanusara99" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/github_w.png" alt="GitHub" width={32} height={32} />
            </a>
            <a href="https://www.behance.net/abanusara99" target="_blank" rel="noopener noreferrer" aria-label="Behance Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/behance.png" alt="Behance" width={32} height={32} />
            </a>
            <a href="https://www.linkedin.com/in/anupriya-balasubramanianas9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/linkedin.png" alt="LinkedIn" width={32} height={32} />
            </a>
            <a href="https://twitter.com/ABAnuSaraTecRel" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/twitter_w.png" alt="Twitter" width={32} height={32} />
            </a>
            <a href="https://www.instagram.com/abanusarareal/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/instagram.png" alt="Instagram" width={32} height={32} />
            </a>
            <a href="https://www.quora.com/profile/Anupriya-B-16" target="_blank" rel="noopener noreferrer" aria-label="Quora Profile" className="transition-transform transform hover:scale-110 hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg">
               <Image src="/img/qov.png" alt="Instagram" width={32} height={32} />
            </a>
          </div>
           <br/>
        </div>


        {/* Skills Section - using online URLs and local images */}
        <div id="skills" className="pt-16 text-center w-full max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8">Skills</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {/* Skill Icons - Updated to use Online URLs and local paths */}
            <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Python">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">Python</span>
            </a>
            <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Node.js">
              <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">Node.js</span>
            </a>
            <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Canva">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" alt="Canva" width={64} height={64} className="rounded-md mb-2" data-ai-hint="design tool"/>
              <span className="text-sm">Canva</span>
            </a>
            <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Figma">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" width={64} height={64} className="rounded-md mb-2" data-ai-hint="design tool"/>
              <span className="text-sm">Figma</span>
            </a>
             <a href="https://www.gimp.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="GIMP">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gimp/gimp-original.svg" alt="GIMP" width={64} height={64} className="rounded-md mb-2"/>
               <span className="text-sm">GIMP</span>
            </a>
            <a href="https://clipchamp.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Video Editing (Clipchamp)"> {/* Updated link and title */}
               <Image src="/img/clipchamp.png" alt="Video Editing (Clipchamp)" width={64} height={64} className="rounded-md mb-2" data-ai-hint="video editor"/> {/* Using local PNG */}
               <span className="text-sm">Video Editing</span>
            </a>
            <a href="https://en.wikipedia.org/wiki/SQL" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="SQL">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" width={64} height={64} className="rounded-md mb-2" data-ai-hint="database symbol"/>
               <span className="text-sm">SQL</span>
            </a>
            <a href="https://www.microsoft.com/en-us/microsoft-365/products-apps-services" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Microsoft Office">
               <Image src="/img/msoffice.png" alt="MS Office" width={64} height={64} className="rounded-md mb-2" data-ai-hint="office suite"/> {/* Using local PNG */}
              <span className="text-sm">MS Office</span>
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="JavaScript">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">JavaScript</span>
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="HTML">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">HTML</span>
            </a>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="CSS">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">CSS</span>
            </a>
            <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="React JSX">
               <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React JSX" width={64} height={64} className="rounded-md mb-2"/>
              <span className="text-sm">React JSX</span>
            </a>
             <a href="https://www.blogger.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Blogger">
                <Image src="/img/blog.png" alt="Blogger" width={64} height={64} className="rounded-md mb-2" style={{ height: '64px', width: 'auto' }} data-ai-hint="blogger logo"/>
                <span className="text-sm">Blogger</span>
            </a>
            <a href="https://en.wikipedia.org/wiki/API" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="API Development">
                <Image src="/img/api.png" alt="API Development" width={64} height={64} className="rounded-md mb-2" data-ai-hint="api code"/>
                <span className="text-sm">API</span>
            </a>
            <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="AI Development">
                 <Image src="/img/aintr.png" alt="AI Development" width={64} height={64} className="rounded-md mb-2" data-ai-hint="artificial intelligence"/>
                <span className="text-sm">AI</span>
            </a>
            <a href="https://www.wix.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center transition-transform transform hover:scale-105 text-foreground hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out p-2 rounded-lg" title="Wix">
                <Image src="/img/2wix.png" alt="Wix" width={64} height={64} className="rounded-md mb-2" data-ai-hint="website builder"/>
                <span className="text-sm">Wix</span>
            </a>
          </div>
         </div>

        {/* Achievements Section */}
        <div id="achievements" className="pt-16 text-center w-full max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-12">Achievements</h2>

        {/* Credly certifications and badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Use grid for responsive columns and gap */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardContent className="pt-6 p-4">
                <CardTitle>Credly Cerificates</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  I got virtual work experience simulations, certificates and badges from Credly via Forage from different companies.
                  I learnt from September 2023 to May 2025.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://www.credly.com/users/anupriya-balasubramanian" target="_blank" rel="noopener noreferrer">View Achievement</a>
                </Button>
              </CardFooter>
            </Card>
            
              {/* Self Courses in Udemy */}
          <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardContent className="pt-6 p-4">
                <CardTitle>My courses in udemy</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  I have uploaded my self courses in Udemy, in concept of  "More Practical and Less theory". You can visit the page to view my courses. I uploaded my courses around 2024. 
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://www.udemy.com/user/anupriya-balasubramanian/" target="_blank" rel="noopener noreferrer">View Achievement</a>
                </Button>
              </CardFooter>
            </Card>            

            {/* Mentorness Internship/ Workshop Achievement */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardContent className="pt-6 p-4">
                <CardTitle>Internship from Mentorness</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  I have done the internship ( the company also called it as workshop) in data science. I attended from November 2023 to October 2023.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://github.com/abanusara99/mentorness/blob/main/Anupriya%20Balasubramanian_Certificate_1.png" target="_blank" rel="noopener noreferrer">View Achievement</a>
                </Button>
              </CardFooter>
            </Card>
            
             {/* AI for India 2.0*/}
          <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardContent className="pt-6 p-4">
                <CardTitle>AI for India 2.0</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  I attended a workshop conducted by GUVI, "AI for India 2.0" with python course. I achieved cerficates for both python and AI for India 2.0 in August 15,2023. 
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://github.com/abanusara99/guvi2.0AI/blob/main/GuviCertification%20-%209S770rD216q2un8hP9.png" target="_blank" rel="noopener noreferrer">View Achievement</a>
                </Button>
              </CardFooter>
            </Card>            

          </div>
        </div>


        {/* Portfolio Section */}
        <div id="portfolio" className="pt-16 text-center w-full max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-12">Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
            {/* Card 2: Password generator */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                <video controls className="w-full h-48 object-cover" data-ai-hint="video editing software">
                  <source src="/vid/pwd.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>Password Generator</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  Password Generator run in render.com using python, html and css which opens delay but good one. You can generate lengthy passwords.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://js-password.onrender.com/" target="_blank" rel="noopener noreferrer">View project</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 2: Mood tracker */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                 <video controls className="w-full h-48 object-cover" data-ai-hint="web application interface">
                  <source src="/vid/trackv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>Mood tracker</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  You can track your mood store them as text file with date and time. I used vercel to deploy.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://mood-tracker-nosql.vercel.app/" target="_blank" rel="noopener noreferrer">Visit project</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 3: Lifecraft Studio - web design */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
            <CardHeader className="p-0">
            <img 
            src="/img/life_studio_crlwebdesign.png" 
            alt="Lifecraft Studio - Web design" 
            className="w-full h-48 object-cover" 
            data-ai-hint=" web application interface preview"
            />
            </CardHeader>
            <CardContent className="pt-6 p-4">
            <CardTitle>Lifecraft Studio - web design</CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
             This project created based on contest given by Lifecraft studio with simple HTML, CSS and javascript. Deployed using Codepen.io.
            </CardDescription>
            </CardContent>
           <CardFooter className="p-4">
           <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
           <a href="https://codepen.io/ABAnu-Sara/pen/GgKbpRa" target="_blank" rel="noopener noreferrer">
            Visit Project
            </a>
            </Button>
            </CardFooter>
            </Card>

            
            {/* Card 4: Medium Article */}
             <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                <video controls className="w-full h-48 object-cover" data-ai-hint="writing article">
                  <source src="/vid/mediumv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>My Medium Articles</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  Discover my thoughts and insights on technology, design, and content creation.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://medium.com/@abanusara9" target="_blank" rel="noopener noreferrer">Read on Medium</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 5: Codepen Article */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                <video controls className="w-full h-48 object-cover" data-ai-hint="writing article">
                  <source src="/vid/codev.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>Codepen</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                 Live deployed projects (html, css, javascript and API) on Codepen.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://codepen.io/ABAnu-Sara/pens/public?cursor=ZD0xJm89MCZwPTEmdj03Mjk2NzgwMw==" target="_blank" rel="noopener noreferrer">Visit Codepen</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 6: GitHub Projects */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                 <video controls className="w-full h-48 object-cover" data-ai-hint="code computer">
                  <source src="vid/githubv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>GitHub Profile</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  Explore my open-source projects and coding contributions on GitHub.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://github.com/abanusara99" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </Button>
              </CardFooter>
            </Card>

            
            {/* Card 7: Behance Design Portfolio */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                 <video controls className="w-full h-48 object-cover" data-ai-hint="graphic design portfolio">
                  <source src="/vid/behv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>Behance Design Portfolio</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  A showcase of my graphic design, canva arts and branding projects on Behance.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="https://www.behance.net/abanusara99" target="_blank" rel="noopener noreferrer">View on Behance</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 8: YouTube */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                 <video controls className="w-full h-48 object-cover" data-ai-hint="canva design interface">
                  <source src="/vid/youv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>YouTube (ABAnuSara Vlog)</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  A variety of designs for social media, presentations, and  stories created as videos.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {/* Replace # with actual link to Canva portfolio or gallery */}
                  <a href="https://www.youtube.com/@abanusaravlog" target="_blank" rel="noopener noreferrer">Visit my Youtube channel</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Card 9: Wix */}
            <Card className="shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden hover:shadow-[0_0_15px_hsl(30,100%,70%,0.3)] transition-shadow duration-200 ease-out card-with-theme-border">
              <CardHeader className="p-0">
                 <video controls className="w-full h-48 object-cover" data-ai-hint="canva design interface">
                  <source src="/vid/wixv.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </CardHeader>
              <CardContent className="pt-6 p-4">
                <CardTitle>Wix Website Portfolio</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                 Visit my Wix portfolio of old version of mine.
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  {/* Replace # with actual link to Canva portfolio or gallery */}
                  <a href="https://abanusara77.wixsite.com/abasanubalan" target="_blank" rel="noopener noreferrer">Visit my Wix Site</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
         <div id="contact" className="pt-16 text-center w-full max-w-xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <p className="mb-8 text-muted-foreground">
                If you like my portfolio and want to work as a team, click the Gmail icon below to reveal and copy my email address.
            </p>
            <div className="flex flex-col items-center">
                <button
                    onClick={handleGmailIconClick}
                    aria-label="Show/Hide email address"
                    className="transition-transform transform hover:scale-110 inline-block p-3 rounded-full shadow-lg hover:shadow-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{border: '4px solid hsl(var(--fire-border))'}}
                >
                    <Image
                        src="/img/gmail.png"
                        alt="Gmail"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                </button>

                {showEmailDisplay && (
                  <div className="mt-6 space-y-4 w-full max-w-md mx-auto">
                    <div className="p-3 bg-card text-card-foreground rounded-lg shadow-lg flex items-center justify-between ring-1 ring-border">
                        <span className="text-sm sm:text-base break-all mr-2">abanubala77@gmail.com</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyEmail('abanubala77@gmail.com')}
                            aria-label="Copy abanubala77@gmail.com"
                            className="text-foreground hover:text-primary flex-shrink-0"
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                     <div className="p-3 bg-card text-card-foreground rounded-lg shadow-lg flex items-center justify-between ring-1 ring-border">
                        <span className="text-sm sm:text-base break-all mr-2">anupriyabalasubramanian003@gmail.com</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyEmail('anupriyabalasubramanian003@gmail.com')}
                            aria-label="Copy anupriyabalasubramanian003@gmail.com"
                            className="text-foreground hover:text-primary flex-shrink-0"
                        >
                            <Copy className="h-5 w-5" />
                        </Button>
                    </div>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}

