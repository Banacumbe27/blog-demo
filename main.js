const topbar_buttons=["Blogs","Search"];
let selected="";
function generate_topbar(topbar,topbar_buttons){
    init=false
    for (const property of topbar_buttons){
        const button=document.createElement('div');
        button.textContent=property;
        button.onclick=()=>{
            if(selected)selected.classList.remove("selected");
            button.classList.add("selected");
            selected=button;
            open_section(property);
        }
            if(!init){
            button.click()
            init=true
        }
        button.classList.add('topbar-button');
        topbar.appendChild(button);
    }
}
function devietnamify(str) {
  str = str.toLowerCase();
  str=str.replaceAll(" ","");
  const map = {
    a: "àáảãạăắằẳẵặâấầẩẫậ",
    d: "đ",
    e: "èéẻẽẹêềếểễệ",
    i: "ìíỉĩị",
    o: "òóỏõọôồốổỗộơờớởỡợ",
    u: "ùúủũụưừứửữự",
    y: "ỳýỷỹỵ"
  };

  for (const nonAccent in map) {
    for (const accent of map[nonAccent]) {
      str = str.replaceAll(accent, nonAccent);
    }
  }

  return str;
}
function conduct_search(query="",blog_data){


output=[];
search_options=["title","date","tags"]; //note: add tags later 
for (blog_info of blog_data){
    for (option of search_options){
        if(blog_info[option])if(devietnamify(blog_info[option]).includes(query)){
            output.push(blog_info);
            break;
        }
    }

}
return output;
}


function generate_search_results(results){

const search_results=document.querySelector('.search-results');
search_results.innerHTML="";
results.forEach(result=>{
const search_result=document.createElement('div');
const img=document.createElement('img');
img.src=result.img;
const title=document.createElement('h1');
title.textContent=result.title;
const date=document.createElement('p');
date.textContent=result.date;
search_result.appendChild(img);
search_result.appendChild(title);
search_result.appendChild(date);
search_results.appendChild(search_result);
});
}
function generate_search_section(){
   const search_section=document.querySelector('.search-section');
   const search_bar=document.createElement('div');
   search_bar.classList.add('search-bar');
   const search_entry=document.createElement('input');
   search_entry.placeholder="Search for blog..."
   search_bar.appendChild(search_entry);
   search_section.appendChild(search_bar);
   search_entry.addEventListener("focusin",()=>{search_entry.style.background="white";search_entry.style.scale=1.4;});
   search_entry.addEventListener("focusout",()=>{search_entry.style.background="rgba(255,255,255,0.4)";search_entry.style.scale=1;});
   const search_results=document.createElement("div");
   search_results.classList.add("search-results");
   search_section.appendChild(search_results);
   search_entry.oninput=e=>{
    let input=devietnamify(e.target.value);
    generate_search_results(conduct_search(input,blog_data));

   }

}
    const sample_blog_data=[
        {
            img:"https://tse2.mm.bing.net/th/id/OIP.PeO6kz1js3ng6pwV8md5ZgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
            title:"CTF là gì?",
            date:"By Duy Nguyen - 26/10/2025",
            tags:"capturetheflagcyberthicompetition"
        },
        {
            img:"https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/12/AES-12.jpg",
            title:"AES là gì? \n Tại sao lại sử dụng AES?",
            date:"By Duy Nguyen - 26/10/2025",
            tags:"cybersecurityencryption"
        },
        {
            img:"cucumber_bg.jpg",
            title:"Vì sao nên ăn dưa leo?",
            date:"By banaCumbe aka Duy Nguyen - 26/10/2025",
            tags:"healthcucumber"
        },
             {
            img:"https://landley.net/history/mirror/linux/Penguin.png",
            title:"Linux-Giá đỡ của hàng nghìn server.",
            date:"by chuchu tv duy nguyen kk - 26/10/2025",
            tags:"linustorwaltinfoserveroperatingsystem"

        },
             {
            img:"https://tse1.mm.bing.net/th/id/OIP.uis-gqftZulPDSA766kj7gHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
            title:"Gà đập chay",
            date:"Anh em chí cốt miền tây",
            tags:"thicompetitionchickenmoney"
        },
            {
            img:"cucumber_bg.jpg",
            title:"Lorem Cumbe sit net",
            date:"26/10/2025",
            tags:"duycumbenetcucumber"
        },    {
            img:"https://i.redd.it/qrncwoyyna941.jpg",
            title:"Lược sử femboy của Phở",
            date:"28/10/2025",
            tags:"thanggaybuithiennghia"
        }





    ]
function fetch_blogs(blog_container_query,blog_data){
    blog_container=document.querySelector(blog_container_query);
    const padding=document.createElement('div');
    padding.classList.add('padding');
    padding.textContent="Swipe left!"
    blog_container.appendChild(padding);
for (const data of blog_data){
    const blog=document.createElement('div');
    blog.classList.add('blog-item');
    const img=document.createElement('div');
    img.style.backgroundImage=`url(${data.img})`;
    img.classList.add('blog-img');
    const title=document.createElement('div');
    title.textContent=data.title;
    title.classList.add("blog-title");
    const date=document.createElement('div');
    date.classList.add("blog-date");
    date.textContent=data.date;
    
    img.appendChild(title);
    img.appendChild(date);
    blog.appendChild(img);
    blog_container.appendChild(blog)
}
const blog_section=document.querySelector('.blog-section')    
const padding2=document.createElement('div');
    padding2.classList.add('padding');
    padding2.textContent="That's all... For now"
    blog_container.appendChild(padding2);
const blog_items=document.querySelectorAll(".blog-item");
const middle=window.innerWidth/2;
blog_container.onscroll=e=>{
blog_items.forEach(item=>{
let offset_from_middle=Math.abs(item.getBoundingClientRect().left-middle+(item.clientWidth/2));
    item.style.scale=3*(1-sigmoid(offset_from_middle/700));
});
}
return blog_data;
}
function sigmoid(x){
    return 1/(1+Math.pow(Math.E,-x))
}
function open_section(section_id){
const search_section=document.querySelector('.search-section');
const blog_section=document.querySelector('.blog-section')
if(section_id=="Blogs"){
    search_section.classList.remove('full-opac');
    blog_section.classList.remove('disabled');
}
if(section_id=="Search"){
    search_section.classList.add('full-opac');
    blog_section.classList.add('disabled');
}
}
generate_topbar(document.querySelector('.topbar'),topbar_buttons);
generate_search_section();
const blog_data=fetch_blogs(".blog-section",sample_blog_data);
// conduct_search("",blog_data)
generate_search_results(conduct_search("",blog_data));