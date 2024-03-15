

const loadData=async()=>{
  const url='https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data =await res.json();
  const tools = data.data.tools;
  displayTool(tools);
}
const displayTool=(tools)=>{
  const toolContainer = document.getElementById('tool-container');
  tools.forEach((tool) => { 
    const toolDiv = document.createElement('div');
    toolDiv.classList=`card w-full lg:w-96 bg-base-100 shadow-xl`
    toolDiv.innerHTML=`
              <figure><img src="${tool.image}" alt="Shoes" /></figure>
              <div class="card-body">
              <h1 class="font-bold text-2xl">Features:  </h1>
              <p>${tool.features.map((feature,index)=> 
                    `<h3>${index+1}.${feature}</h3>`).join("") }</p>
              <hr>
              <div class="card-actions flex-col justify-left">
              <p class="text-2xl font-bold">${tool.name}</p>
              <div class="flex justify-between gap-52">
              <div class="flex gap-3">
              <p><i class="fa-solid fa-calendar-days "></i></p>
              <p>${tool.published_in}</p>
              </div>
              <div onclick="handleShowDetail('${tool.id}')">
              <i class="fa-solid fa-arrow-right bg-pink-300 
              rounded-full px-3 text-pink-500 font-bold md:-ml-12 text-2xl"></i>
              </div>
              </div>
              </div>
              </div>`
  toolContainer.appendChild(toolDiv);
  }); 
}

const handleShowDetail=async(id)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
  const data = await res.json();
   const details = data.data;
  displayShowDetails(details);
}
const displayShowDetails = (details
  )=>{
  const{id,tool_name,description,website,logo}=details;
    const showContainer = document.getElementById('show-detail-container');
    showContainer.innerHTML=`
    <div class="flex lg:flex-row flex-col  justify-between gap-4 items-center mx-auto lg:p-10 border-4 border-rose-500 shadow-2xl   rounded-lg">
    <div class="flex flex-col lg:w-1/2 text-black">
      <h2 class="lg:text-2xl text-center lg:text-left text-xl font-semibold">${description}</h2>
       <div class="flex justify-between lg:flex-row flex-col md:flex-row px-6 gap-5 my-9">
       ${details.pricing.map((price)=>`
      
        <div class="bg-pink-100 p-3 rounded-2xl text-center items-center">
          <p class="text-[#03A30A] ">${price.price}</p>
            <p class="text-[#F28927]">${price.plan}</p>
        </div>
         `).join("")}
       </div>
  
       <div class="flex lg:justify-between flex-col md:justify-around lg:flex-row md:flex-row ml-5">
       <div>
       <h2 class="text-2xl font-semibold">Features</h2>
       <ul class="text-base font-normal">
       <li class="list-disc">${details.features[1].feature_name}</li>
       <li class="list-disc">${details.features[2].feature_name}</li>
       <li class="list-disc">${details.features[3].feature_name}</li>
       </ul>
      </div>
        <div>
          <h2 class="text-2xl font-semibold">Integrations</h2>
          ${details.integrations.map((integration)=>`
          <ul class="text-base font-normal">
          <li class="list-disc">${integration}</li>
          </ul>
          `).join("")}
        
        </div>
       </div>
    </div>
    <div class="text-center md:flex md:flex-col ">
      <img src="${details.image_link[0]}" class="lg:w-96 w-80 mx-auto" alt="" >
     
      ${details.input_output_examples.map((question)=>
        `
        <h2 class="text-2xl font-semibold text-black lg:w-96 w-80 mx-auto">${question.input}</h2>
        <p class="text-center lg:w-96 mx-auto w-80 text-[#585858] ">${question.output}</p>
        
        `

      ).join("")}
      
    </div>
  </div>
    
    
    
    `



    // show the modal
    show_details_modal.showModal();
}
loadData();
