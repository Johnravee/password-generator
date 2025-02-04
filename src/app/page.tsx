'use client'
import { LuRefreshCw } from "react-icons/lu";
import { IoCopy } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io"; 
import { RiNextjsLine } from "react-icons/ri";
import { SiShadcnui } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";

export default function Home() {
  
  interface SwitchState {
    name: string;
    isOn: boolean;
  }

  const [password, Setpassword] = useState<string>('');
  const [haba, setHaba] = useState<number>(1);
  const [copied, SetCopied] = useState<boolean>(false);

  const options : string[] = ['abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', "~`!@#$%^&*()_+=[]{};':/|,./<>?"]

  const [switches, setSwitches] = useState<SwitchState[]>([
    { name: "All", isOn: true },
    { name: "Lower case", isOn: false },
    { name: "Upper case", isOn: false },
    { name: "Numbers", isOn: false },
    { name: "Special characters", isOn: false },
  ]);

  // Handle switch changes 
  const handleSwitchChange = (index: number) => (checked: boolean) => {
    const updatedSwitches = [...switches];
    updatedSwitches[index].isOn = checked;
    setSwitches(updatedSwitches);
  };

  const handleOption = () =>{
    const arr : string[] = [];
    
    if (switches[0].isOn) arr.push(...options.join('')); // Lower case
    if (switches[1].isOn) arr.push(...options[0]); // Lower case
    if (switches[2].isOn) arr.push(...options[1]); // Upper case
    if (switches[3].isOn) arr.push(...options[2]); // Numbers
    if (switches[4].isOn) arr.push(...options[3]); // Special characters

     const uniqueArr = Array.from(new Set(arr.join('')));

      return uniqueArr.join('');
  }

  const handleGenerate =  () =>{
    SetCopied(false);
    const result = handleOption(); 
    let generatedPassword = '';
    let size = haba
    
    for(let i = 0, x = result.length; i < size; i++)
    {
         generatedPassword += result.charAt(Math.floor(Math.random() * x))
    };

    Setpassword(generatedPassword);

  }

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(() => {
        SetCopied(true)
      }).catch((error) => {
       return error
      });
    }
  };

  return (
    <div className="w-full h-full lg:h-screen flex justify-center items-center flex-col gap-5">
      <main className="w-full h-auto lg:w-1/2 lg:h-auto flex justify-center items-center lg:border lg:shadow-md flex-col gap-5 p-10 animate-fade animate-once animate-duration-1000 animate-delay-50 ">
        <section className="w-full flex justify-center items-center flex-col">
          <h1 className="text-gray-600 font-bold text-3xl mb-5 text-center animate-fade-down animate-once animate-duration-1000 animate-delay-200">Random Password Generator</h1>
          <p className="text-gray-500 font-bold text-md mb-5 text-center animate-fade-down animate-once animate-duration-1000 animate-delay-300">This password generator creates strong, random passwords with customizable length and complexity, helping users enhance online security.</p>
        </section>

        {/* Generator Section */}
        <section className="w-full lg:w-3/4  border-b-4 border-b-green-400 border-2 flex flex-row p-5 gap-3 animate-fade-down animate-once animate-duration-1000 animate-delay-450">
          <div className="flex-1 overflow-x-auto whitespace-nowrap">
            <Input type="email" value={password} className="focus-visible:outline-none focus-visible:ring-0 border-none font-bold tracking-wider text-lg" readOnly />
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="cursor-pointer hover:bg-slate-200 p-1 rounded-sm" onClick={handleGenerate}>
              <LuRefreshCw size={20} />
            </div>
            <div className="cursor-pointer hover:bg-slate-200 p-1 rounded-sm" onClick={handleCopy}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {!copied ?  <IoCopy size={20} /> : <IoMdCheckboxOutline size={20} />}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{!copied ?  "copy" : "copied"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
            </div>
          </div>
        </section>

        {/* Switches Section */}
        <section className="border-2 p-10 w-full h-auto lg:w-3/4 flex flex-col gap-10 animate-fade-down animate-once animate-duration-1000 animate-delay-500 ">
          <h2 className="text-2xl font-bold text-green-400">Customize your password</h2>

          <div className="w-full flex flex-col justify-center gap-2 lg:flex-row lg:justify-evenly lg:items-center lg:flex-wrap lg:gap-10">
            {switches.map((switchState, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Switch
                id={switchState.name}
                checked={switchState.isOn}
                onCheckedChange={handleSwitchChange(index)}
              />
              <Label htmlFor={switchState.name} className="font-semibold text-md text-muted-foreground">{switchState.name}</Label>
            </div>
          ))}

          {/* Input section */}
          <section className="flex flex-row items-center gap-3 flex-1">
            <Input
                type="number"
                placeholder="Length"
                id="length"
                className="w-full"
                min={1}
                value={haba}
                onChange={(e) => setHaba(parseInt(e.target.value) || 1)} 
              />
            <Label htmlFor="length" className="font-semibold text-muted-foreground text-md">Length</Label>
          </section>
          </div>
        </section>
      </main>
      <footer className="mt-3 animate-fade-down animate-once animate-duration-1000 animate-delay-700">
          <h4 className="text-muted-foreground font-semibold text-md">Developed By <span className="font-bold text-md">John Rave Mimay</span></h4>
          <p className="text-center mt-3 text-muted-foreground text-sm font-semibold">Powered By</p>
          <div className="w-full flex-row justify-center items-center mt-1">
            <Badge variant={'secondary'} className="p-2 gap-2 items-center">
              <RiNextjsLine size={20} />
              <span className="text-sm font-semibold text-muted-foreground">Next.js</span>
              </Badge>
            <Badge variant={'secondary'} className="p-2 gap-2 items-center">
                <SiShadcnui size={20} /> 
                <span className="text-sm font-semibold text-muted-foreground">Shadcn UI</span>
              </Badge>
          </div>
      </footer>
    </div>
  );
}
