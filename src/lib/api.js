


const baseurl = window.location.hostname.includes('vercel.app')
  ? 'http://localhost2000'
  : 'https://backend-zdzm.onrender.com';

export const api={
    article:{
        create:`${baseurl}/article/create`,
        display:`${baseurl}/article/displayarticle`,
        displaysingle:(id)=>`${baseurl}/article/displayarticle/${id}`,
        delete:(id)=>`${baseurl}/article/deletearticle/${id}`,
        update:(id)=>`${baseurl}/article/updatearticle/${id}`
    },
    auth:{
        login:`${baseurl}/auth/loginuser`,
        verifyuser:`${baseurl}/auth/verifyuser`,
        register:`${baseurl}/auth/register`,
        logout:`${baseurl}/auth/logout`
    },
    comment:{
        create:`${baseurl}/comment`,
        get:`${baseurl}/commentget`,
        beforelogincomment:(id)=>`${baseurl}/beforelogincomment/${id}`,
        getuseremail:(id)=>`${baseurl}/useremail/${id}`,
        afterlogincomment:`${baseurl}/afterlogincomment`,
        afterlogincommentsget:`${baseurl}/afterlogincommentsget`,
        afterlogincommentsgetid:(id)=>`${baseurl}/afterlogincomment/${id}`,
    },
    Contact:{
        contact:`${baseurl}/contact/contact`,
    },
    countrydetect:{
        countrydetect:`${baseurl}/countrydetect`,
    },
    visitcount:{
        visitcount:`${baseurl}/visit`,
        visitcountget:`${baseurl}/visit`,
    }
}