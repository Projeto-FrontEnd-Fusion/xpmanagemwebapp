"use client";
import Image from "next/image";
import Link from "next/link";
import { Check, ColumnsIcon, Telescope } from "lucide-react";
import { First, Second, Tird } from "./components/img-icons/ranking.icons";
import { ReactHTMLElement, cloneElement, useEffect, useState } from "react";
import exploreLogo from '@/app/components/img-icons/codeexplorelogo.svg'
//importação do Firebase

import { db } from "../../services/firebaseconfig";

// Válidação de Formulário
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Importa yupResolver do react-hook-form
import { addDoc, collection } from "firebase/firestore";
import { ref, push, set, onValue } from "firebase/database";

export default function Home() {


  // [typescript] --- definir os tipos de dados registrados no firebase


  // secondPlaceName: "Daniel silva",
  // tirdlaceName: "Pedro Lucas"

  const [firstPlaceMember, setfirstPlaceMember] = useState<schemaForms | null>(null);
  const [secondPlaceMember, setsecondPlaceMember] = useState<schemaForms | null>(null);
  const [thirdPlaceMember, setthirdPlaceMember] = useState<schemaForms | null>(null);

  const [firstName, setFirstName] = useState("");
  const [secondName, setsecondName] = useState("");
  const [tirdName, settirdName] = useState("");

  // gestão de botão de Xp
  const [xPBtn, setxPBtn] = useState(false);
  const [writeName, setWriteName] = useState("");

  //state do formulário
  const [avatarForm, setAvatarForm] = useState('');
  const [GitHubProfileLink , setGitHubProfileLink] = useState('');



  // [#01] - trazer os dados do github
  useEffect(() => {
    async function getData() {
      try {
        const responseFirst = await fetch(
          "https://api.github.com/users/dinhoSilwa"
        );
        if (!responseFirst.ok) {
          throw new Error("Falha ao obter dados do (user-1)");
        }
        console.log("Dados obtidos com sucesso (user 01)");
        const resFirst = await responseFirst.json();

        setfirstPlaceMember({
         
          formGitHubName: resFirst.login,
          formGitHubAvatar: resFirst.avatar_url,
          formGithubHtmlUrl: resFirst.html_url,
          formGitHubDescription: resFirst.bio,
          formXp: resFirst.id
        });

        const responseSecond = await fetch(
          "https://api.github.com/users/carlosbrunosa"
        );
        if (!responseSecond.ok) {
          throw new Error("Falha ao obter dados");
        }
        console.log("Dados obtidos com sucesso (user 02)");
        const resSecond = await responseSecond.json();

        setsecondPlaceMember({
          formGitHubName: resSecond.login,
          formGitHubAvatar: resSecond.avatar_url,
          formGithubHtmlUrl: resSecond.html_url,
          formGitHubDescription: resSecond.bio,
          formXp: resSecond.id
        });

        const responseThird = await fetch(
          "https://api.github.com/users/fiona"
        );
        if (!responseThird.ok) {
          throw new Error("Falha ao obter dados (user-3)");
        }
        console.log("Dados obtidos com sucesso (user 03)");
        const resThird = await responseThird.json();

        setthirdPlaceMember({
          formGitHubName: resThird.login,
          formGitHubAvatar: resThird.avatar_url,
          formGithubHtmlUrl: resThird.html_url,
          formGitHubDescription: resThird.bio,
          formXp: resThird.id
        });
      } catch (error) {
        console.log("Falha ao obter Dados", error);
      }
    }
    getData();
  }, []);

useEffect(() => {
  async function getMembers() {
    try{
      
    const getDataRef = ref(db, "frontenFusionMembers");
    const userMembers = [];
   await onValue(getDataRef, (snapshot) => {
      const dataMembers = snapshot.val();
      if (dataMembers) {
        Object.keys(dataMembers).forEach((key) => {
          const user = dataMembers[key];
          userMembers.push(user);
        });
        console.log(" Dados encontrado com sucesso")
      }
     

    });
    }catch(error){
      console.error("Falha ao obter dados", error)
    }
  }

  getMembers();
}, []);
const [allIds, setallIds] = useState([])


  // [0#2] -- registra os dados do formulário

  async function onSubmit(data: schemaForms) {
    try {
       const firebaseRef = ref(db, "frontenFusionMembers");
       const newMemberRef = push(firebaseRef); 
 
       await set(newMemberRef, {
          formGitHubName: data.formGitHubName,
          formGitHubAvatar: data.formGitHubAvatar,
          formGithubHtmlUrl: data.formGithubHtmlUrl,
          formGitHubDescription: data.formGitHubDescription,
          formXp: data.formXp

         
       });
 
       console.log("Membro Registrado com Sucesso");
    } catch(error) {
       console.error("Erro ao Registrar Membro:", error);
    }
 }
 
   // *FIM


   interface schemaForms {
  
    formGitHubName: string;
    formGitHubAvatar: string;
    formGithubHtmlUrl: string;
    formGitHubDescription: string;
    formXp: number;
  }

  // [schema - YUP] --- define um schema de validação
  const formSchema = yup.object().shape({
    formGitHubName: yup.string().required("Para Prover XP digite um github username"),
    formGitHubAvatar: yup.string().required(),
    formGithubHtmlUrl: yup.string().required(),
    formGitHubDescription: yup.string().required("Adicione uma Descrição"),
    formXp: yup.number().required("Digite uma quantidade de XP")
});

// *FIM

  
  // [validação com YUP] --- valida od dados submetidos no forms
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaForms>({
    resolver: yupResolver(formSchema),
  });
  // *fim




// [#03] --- validar useName do Github
  async function userNameCheck() {
 try{
  const membercheck = await fetch(
    `https://api.github.com/users/${writeName}`
  );
  if(!membercheck.ok){
    console.log("Falha ao Buscar Usuário, Verifique novamente")
    
  }
  const checkedMember = await membercheck.json();
  setAvatarForm(checkedMember.avatar_url);
  setGitHubProfileLink(checkedMember.html_url)
  console.log("Dados do gitHub obtidos com sucesso")
 


 }catch(error){
  console.log("Falha ao Buscar Usuário, Verifique novamente")
 }
  }


  return (
    <>
      <section>
       
        <header
          className="text-white flex flex-col justify-center 
        items-center w-full h-20 mt-10 "
        >
          <Image src={exploreLogo} width={2} height={2} alt="code explorer Logo" />
          <h2>CODE EXPLORE</h2>
          <h3 className="text-xl text-cyan-300">LEADERBOARD</h3>
        </header>
        {/* // sesão de imagems do hanking */}
        <section className="w-full px-12">
          <section
            className=" flex w-[100%] items-center 
          justify-between"
          >
            {/* second user hanking */}
            <div
              className="sub-users  mt-[100px] w-16 h-16 rounded-full overflow-hidden flex 
            items-center justify-center border-4 border-[#0A4D65]"
            >
              {firstPlaceMember && (
                <Image
                  src={firstPlaceMember.formGitHubAvatar}
                  width={80}
                  height={80}
                  alt="first place one"
                  priority
                />
              )}
            </div>

            {/* end second user hanking here */}

            {/* first user hanking */}
            <div
              className=" w-18 h-18 rounded-full overflow-hidden flex 
            items-center justify-center border-[8px] border-[orange]"
            >
              {secondPlaceMember && (
                <Image
                  src={secondPlaceMember.formGitHubAvatar}
                  width={80}
                  height={80}
                  alt="first place one"
                  priority
                />
              )}
            </div>

            {/* end first user hanking here */}

            {/* tird user hanking */}
            <div
              className="sub-users  mt-[100px] w-16 h-16 rounded-full overflow-hidden flex 
            items-center justify-center border-4 border-[#0A4D65]"
            >
              {thirdPlaceMember && (
                <Image
                  src={thirdPlaceMember.formGitHubAvatar}
                  width={80}
                  height={80}
                  alt="first place one"
                  priority
                />
              )}
            </div>

            {/* end tird user hanking here */}
          </section>

          {/* ranking number infor icons */}
          <div className=" flex items-center justify-between px-4 relative mt-[-14px]">
            <span className="relative  ">
              {" "}
              <Second />
            </span>
            <span className=" relative mt-[-80px]">
              <First />
            </span>
            <span className="relative  ">
              <Tird />
            </span>
          </div>
        </section>
        {/* barra de hankings */}
        <section className="z-30">
          <div className="absolute ml-[40%] efectLayers1 h-10 w-10 bg-cyan-500 rounded-full"></div>
          <div className="absolute ml-[60%] mt-[100px] efectLayers2 h-10 w-10 bg-cyan-500 rounded-full"></div>
        </section>
        <section className=" w-[90%] ml-auto mr-auto flex items-end justify-center">
          <div className="sub-users-ranking rounded bg-opacity-50 bg-black inset-0 backdrop-blur-xl px-1 pt-2 h-[120px] w-[30%]">
            <ul className="flex flex-col w-full items-center justify-center text-center z-20">
              <li className="text-[10px]  grid place-content-center mb-2">
                <Telescope className="text-white" strokeWidth={1} />{" "}
              </li>
              <li
                className="text-[14px] w-[100%] px-1 text-white font-[inter]
               text-center flex items-center justify-center flex-wrap leading-none"
              >
                {firstPlaceMember && (
                  <Link href={firstPlaceMember.formGithubHtmlUrl}>
                    <p className="w-[100%] text-[11px] text-white flex justify-center flex-wrap break-words">
                      @{firstPlaceMember.formGitHubName}
                    </p>
                  </Link>
                )}
              </li>
              <li className="text-[12px] text-center mt-2 text-cyan-300 font-regular ">
                Xp 
              </li>
            </ul>
          </div>
          <div className=" rounded bg-opacity-50 bg-black inset-0 backdrop-blur-xl px-4 pt-6 flex-1 h-[180px]">
            <ul className="  flex flex-col w-full">
              <li className="text-[10px]  grid place-content-center mb-2">
                {" "}
                <Telescope className="text-white" strokeWidth={1} />{" "}
              </li>
              <li
                className="text-[14px] w-[100%] px-1 text-white font-[inter]
               text-center flex items-center justify-center flex-wrap leading-none"
              >
                {secondPlaceMember && (
                  <Link href={secondPlaceMember.formGithubHtmlUrl}>
                    <p className="w-[100%] text-[11px] text-white flex justify-center flex-wrap break-words">
                      @{secondPlaceMember.formGitHubName}
                    </p>
                  </Link>
                )}
              </li>
              <li className="text-[12px] text-center mt-2 text-cyan-300 font-regular ">
                Xp 200
              </li>
            </ul>
          </div>
          <div className="sub-users-ranking rounded bg-opacity-50 bg-black inset-0 backdrop-blur-xl px-1 pt-2 h-[120px] w-[30%]">
            <ul className="flex flex-col w-full items-center justify-center text-center">
              <li className="text-[10px]  grid place-content-center mb-2">
                {" "}
                <Telescope className="text-white" strokeWidth={1} />{" "}
              </li>
              <li
                className="text-[14px] w-[100%] px-1 text-white font-[inter]
               text-center flex items-center justify-center flex-wrap leading-none"
              >
                {thirdPlaceMember && (
                  <Link href={thirdPlaceMember.formGithubHtmlUrl}>
                    <p className="w-[100%] text-[11px] text-white flex justify-center flex-wrap break-words">
                      @{thirdPlaceMember.formGitHubName}
                    </p>
                  </Link>
                )}
              </li>
              <li className="text-[12px] text-center mt-2 text-cyan-300 font-regular ">
                Xp 200
              </li>
            </ul>
          </div>
        </section>
        {/* área do formulário */}

        <nav className={!xPBtn ? "hidden" : "flex"}>
          <section
            className={`bg-white w-full h-full bottom-0 absolute z-50 flex flex-col justify-center`}
          >
            <header className="text-center px-6 mb-8  flex justify-center">
              <div
                className="bg-red absolute right-6 top-4 text-[10px]"
                onClick={() => setxPBtn(!xPBtn)}
              >
                {" "}
                <strong>Fechar</strong>{" "}
              </div>
              {/* <strong className="font-bold w-[70%]"> Preencha os Dados Abaixo para Prover Xp</strong> */}
              <ul
                className="flex flex-col gap-2 items-center justify-center 
           
           rounded-sm pr-0 ml-auto mr-auto"
              >
                <li className="rounded-full w-14 h-14 bg-zinc-300 grid place-content-center overflow-hidden ">
                  {avatarForm && (
                    <Image
                      src={avatarForm}
                      width={80}
                      height={80}
                      alt="avatarForms"
                      priority
                    />
                  )}
                </li>
                <span className="flex flex-col ">
                  <li className=" grid place-content-center font-[inter] ">
                    <strong>{writeName.toLocaleLowerCase()}</strong>
                  </li>
                  <li className=" grid place-content-center text-blue-900">
                    XP 000
                  </li>
                </span>
              </ul>
            </header>
{/* formúlário de previsão de XP */}
            <form
              className="border p-4 flex flex-col gap-6 overflow-y-hidden" 
              onSubmit={handleSubmit(onSubmit)}
            >
              <fieldset className="border flex flex-col gap-2">
                <span
                  className={
                    avatarForm
                      ? "p-4 absolute right-4 text-green-500 font-extrabold"
                      : "border p-4 absolute right-4"
                  }
                  onClick={userNameCheck}
                >
                  <Check strokeWidth={4} />
                </span>

                <input
                  className={
                    avatarForm
                      ? "shadow text-md font-[inter] bg-green-100 p-4 rounded-lg text-green-950"
                      : "shadow text-md font-[inter] bg-zinc-100 p-4 rounded-lg"
                  }
                  type="text"
                  placeholder="User Name Github"
                  onInput={(event :React.ChangeEvent<HTMLInputElement>) => setWriteName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.keyCode === 32 || event.key === "") {
                      event.preventDefault();
                    }
                  }}
                  {...register("formGitHubName")}
                />
                {errors.formGitHubName && (
                  <span className="text-red-500 font-[inter] relative px-2">
                    {errors.formGitHubName?.message?.toString()}
                  </span>
                )}
              </fieldset>
              <fieldset className="border flex flex-col gap-2">
                <input
                  className="shadow text-md font-[inter] bg-zinc-100 p-4 rounded-lg"
                  type="number"
                  placeholder="Quantidade de XP"
                  {...register("formXp")}
                />
                {errors.formXp && (
                  <span className="text-red-500 font-[inter] relative px-2">
                    {errors.formXp?.message?.toString()}
                  </span>
                )}
              </fieldset>
              <fieldset>
                <textarea
                  className="shadow w-[100%] ml-auto mr-auto border font-[inter] p-4 rounded-lg"
                  cols={4}
                  placeholder="Descreva a Atividade Finalizada"
                  {...register("formGitHubDescription")}
                ></textarea>
                {errors.formGitHubDescription && (
                  <span className="text-red-500 font-[inter] relative px-2">
                    {errors.formGitHubDescription?.message?.toString()}
                  </span>
                )}
              </fieldset>
              <fieldset className="hidden">
              <input type="text" defaultValue={avatarForm} {...register('formGitHubAvatar')}/>
              <input type="text" defaultValue={GitHubProfileLink} {...register('formGithubHtmlUrl')}/>


              </fieldset>

              
              

              <button
                type="submit"
                className="bg-blue-600 text-white p-4 rounded-md"
              >
                PROVER
              </button>
            </form>
          </section>
        </nav>

        {/* botão para prover Xp */}

        {!xPBtn ? (
          <div
            onClick={() => setxPBtn(!xPBtn)}
            className="z-50 border absolute bottom-2 right-6 w-16 h-16 text-white grid place-content-center
    rounded-full bg-cyan-700
    "
          >
            XP
          </div>
        ) : null}
<div>
  <ul className="w-full text-white font-[inter]">
  <li className="w-[90%] p-2 bg-slate-950">ranking 04</li>
  <li>ranking 05</li>
  <li>ranking 06</li>
  <li>ranking 07</li>
  </ul>
</div>

      </section>
    </>
  );
}
