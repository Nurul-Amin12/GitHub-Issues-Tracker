
// All section
const loadAll = async()=>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const json = await res.json();
    displayAll(json.data);
}

// Search section 
const loadSearch = async(input) =>{
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input}`;
    const res = await fetch(url);
    const json = await res.json();

    const searchUnavailable = getElements('search-unavailable');
    if( json.data.length ===0 ) {
        // get the container & empty it
        const allBtn = getElements('all-btn'); 
        allBtn.innerHTML = '';

        searchUnavailable.classList.remove('hidden');
    }
    else {
        searchUnavailable.classList.add('hidden');
        displayAll(json.data);
    }
}


// Modal section
const cardDetails = async(id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const card = await res.json();
    displayDetails(card.data);
}

const displayDetails = (detail) =>{
    const container = getElements('card-container');

    // Assignee name formate 
    const str = detail.assignee;
    const parts = str.split("_");
    const formatted = parts.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    );
    const Assignee = formatted.join(" ");

    // date formate
    const isoDate = detail.updatedAt;
    const date = `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}`;

    // status update
    let open1='',close1='',open2='',close2='';
    if( detail.status==='open' ) { open1='', close1='hidden'; }
    else { open2='hidden', close2=''; }


    // tag add
    let strTag='';
    detail.labels.forEach( el =>{
        if(el=='bug'){
            strTag += '<div class="px-3 py-2 rounded-full border bg-[#FEECEC] text-[#EF4444] gap-2 flex"><span><i class="fa-solid fa-bug"></i></span>Bug</div>';
        } 
        else if( el=='help wanted' ) {
            strTag += '<div class="px-3 py-2 rounded-full border bg-[#FFF8DB] text-[#D97706] gap-2 flex"><span><i class="fa-regular fa-life-ring"></i></span>HELP WANTED</div>';
        }
        else if( el=='enhancement' ) {
            strTag += '<div class="px-3 py-2 rounded-full border bg-[#cee9d2] text-[#37d906] gap-2 flex items-center"><span><i class="fa-solid fa-star"></i></span>Enhancement</div>';
        }
        else if( el=='good first issue' ) {
            strTag += '<div class="px-3 py-2 rounded-full border bg-[#d5f1ee] text-[#06d9b2] gap-2 flex items-center"><span><i class="fa-solid fa-certificate"></i></span>GOOD FIRST ISSUE</div>';
        }
        else if( el=='documentation' ) {
            strTag += '<div class="px-3 py-2 rounded-full border bg-[#dee3f1] text-[#0642d9] gap-2 flex items-center"><span><i class="fa-brands fa-files-pinwheel"></i></span>DOCUMENTATION</div>';   
        }
    })
    

    container.innerHTML = `
        <h3 class="text-lg font-bold mb-3">${detail.title}</h3>
        <div class="flex text-center items-center gap-2">
            <div class="${open2} ${close2} flex items-center"><div class="px-6 py-1 rounded-full bg-green-400 text-[white] mr-2">Open</div> <span class="text-[#64748B] items-center"> - Opened by</span></div>
            <div class="${open1} ${close1} flex items-center"><div class="px-6 py-1 rounded-full bg-[#A855F7] text-[white] mr-2">Close</div> <span class="text-[#64748B] items-center"> - Closed by</span></div>
            <p class="text-[#64748B]">${Assignee}</p>
            <div class=" text-[#64748B] items-center">-</div>
            <p class="text-[#64748B]">${date}</p>
        </div>
        <div class="flex gap-4 flex-wrap my-6">
            ${strTag}
        </div>
        <p>${detail.description}</p>
        <div class="grid grid-cols-2 my-10 bg-base-200 p-5 rounded-md">
            <div class="space-y-3">
                <p class="text-[#64748B]">Assignee:</p>
                <p class="font-bold">${Assignee}</p>
            </div>
            <div class="space-y-3">
                <p class="text-[#64748B]">Priority</p>
                <div id="pri-${detail.id}" class="px-7 py-2 w-30 rounded-full text-center">${detail.priority.toUpperCase()}</div>
            </div>
        </div>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
            </form>
        </div>

    `;

    
    // Priority capsule background color
    const priID = 'pri-'+detail.id;
    const priority = getElements(priID);
    if( detail.priority==='low' ) {
        priority.classList.add('text-[white]', 'bg-[#9CA3AF]');
    }
    else if( detail.priority==='medium' ) {
        priority.classList.add('text-[white]', 'bg-[#F59E0B]');
    }
    else if( detail.priority==='high' ) {
        priority.classList.add('text-[white]', 'bg-[#EF4444]');
    }

    getElements('card_details').showModal();
}


//  display all card
const displayAll = (data) => {

    // label background manage
    getElements('label-all').classList.add('bg-[#422ad5]', 'text-white');
    getElements('label-open').classList.remove('bg-[#422ad5]', 'text-white');
    getElements('label-close').classList.remove('bg-[#422ad5]', 'text-white');

    // get the container & empty it
    const allBtn = getElements('all-btn'); 
    allBtn.innerHTML = '';

    // travel to all card
    for(let element of data) {
        const cardDiv = document.createElement('div');

        // status update
        let status = element.status;
        let open1='',close1='',open2='',close2='',border='';
        if(status=="open") {
            open1='';
            close1='hidden';
            border='border-green-500';
            // if(labelStatus!=='open' && labelStatus!=='all') continue;
        }
        else {
            open2='hidden';
            close2='';
            border='border-[#A855F7]';
            // if(labelStatus!=='closed' && labelStatus!=='all') continue;
        }

        
        // card info added
        cardDiv.innerHTML = `
            <div onclick="cardDetails(${element.id})" class="card bg-base-100 shadow-md border-t-4 ${border} h-full">
                <div class="card-body">
                    <div class="flex justify-between items-center">
                        <div class="flex">
                            <img class="${open2} ${close2}" src="./assets/Open-Status.png">
                            <img class="${open1} ${close1}" src="./assets/Closed- Status .png">
                        </div>
                        <div id='priority-${element.id}' class="px-7 py-2 rounded-full  gap-2 flex font-semibold">${element.priority.toUpperCase()}</div>
                    </div>
                    <div class="border-b-2 border-gray-300 space-y-2 py-5">
                        <h2 class="card-title">${element.title}</h2>
                        <p>${element.description}</p>
                        <div id="tag-${element.id}" class="flex flex-wrap gap-4 mt-5">
                           
                        </div>
                    </div>
                    <div class="space-y-3 pt-4">
                        <p class="text-[#64748B]">#1 ${element.author}</p>
                        <p class="text-[#64748B]">${element.createdAt.slice(0,10)}</p>
                    </div>
                </div>
                
            </div>
        `;

        allBtn.append(cardDiv);

        // Update total issues
        getElements('total-issues').innerText = allBtn.children.length;
       
        // tag add 
        const tag = document.createElement('div');
        let str='';
        element.labels.forEach( el =>{
            if(el=='bug'){
                str += '<div class="px-3 py-2 rounded-full border bg-[#FEECEC] text-[#EF4444] gap-2 flex"><span><i class="fa-solid fa-bug"></i></span>Bug</div>';
            } 
            else if( el=='help wanted' ) {
                str += '<div class="px-3 py-2 rounded-full border bg-[#FFF8DB] text-[#D97706] gap-2 flex"><span><i class="fa-regular fa-life-ring"></i></span>HELP WANTED</div>';
            }
            else if( el=='enhancement' ) {
                str += '<div class="px-3 py-2 rounded-full border bg-[#cee9d2] text-[#37d906] gap-2 flex items-center"><span><i class="fa-solid fa-star"></i></span>Enhancement</div>';
            }
            else if( el=='good first issue' ) {
                str += '<div class="px-3 py-2 rounded-full border bg-[#d5f1ee] text-[#06d9b2] gap-2 flex items-center"><span><i class="fa-solid fa-certificate"></i></span>GOOD FIRST ISSUE</div>';
            }
            else if( el=='documentation' ) {
                str += '<div class="px-3 py-2 rounded-full border bg-[#dee3f1] text-[#0642d9] gap-2 flex items-center"><span><i class="fa-brands fa-files-pinwheel"></i></span>DOCUMENTATION</div>';   
            }
        })
        
        tag.classList.add('flex','flex-wrap', 'gap-2')
        tag.innerHTML = str;
        const tagId = 'tag-'+element.id;
        getElements(tagId).append(tag);


        // Priority capsule background color
        const priID = 'priority-'+element.id;
        const priority = getElements(priID);
        if( element.priority==='low' ) {
            priority.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]');
        }
        else if( element.priority==='medium' ) {
            priority.classList.add('bg-[#FFF6D1]', 'text-[#F59E0B]');
        }
        else if( element.priority==='high' ) {
            priority.classList.add('bg-[#FEECEC]', 'text-[#EF4444]');
        }

    };
 
    
    
    // const labelStatus = 'all';
    getElements('label-all').addEventListener('click',()=>{
        // label background manage
        getElements('label-all').classList.add('bg-[#422ad5]', 'text-white');
        getElements('label-open').classList.remove('bg-[#422ad5]', 'text-white');
        getElements('label-close').classList.remove('bg-[#422ad5]', 'text-white');

        // get the container & empty it
        const allBtn = getElements('all-btn'); 
        allBtn.innerHTML = '';
        

        // travel to all card
        for(let element of data) {
            
            const cardDiv = document.createElement('div');
            
            // status update
            let status = element.status;
            let open1='',close1='',open2='',close2='',border='';
            if(status=="open") {
                open1='';
                close1='hidden';
                border='border-green-500';
            }
            else {
                open2='hidden';
                close2='';
                border='border-[#A855F7]';
            }

            
            // card info added
            cardDiv.innerHTML = `
                <div class="card bg-base-100 shadow-md border-t-4 ${border} h-full">
                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <div class="flex">
                                <img class="${open2} ${close2}" src="./assets/Open-Status.png">
                                <img class="${open1} ${close1}" src="./assets/Closed- Status .png">
                            </div>
                            <div id='priority-${element.id}' class="px-7 py-2 rounded-full  gap-2 flex font-semibold">${element.priority.toUpperCase()}</div>
                        </div>
                        <div class="border-b-2 border-gray-300 space-y-2 py-5">
                            <h2 class="card-title">${element.title}</h2>
                            <p>${element.description}</p>
                            <div id="tag-${element.id}" class="flex flex-wrap gap-4 mt-5">
                            
                            </div>
                        </div>
                        <div class="space-y-3 pt-4">
                            <p class="text-[#64748B]">#1 ${element.author}</p>
                            <p class="text-[#64748B]">${element.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                    
                </div>
            `;

            allBtn.append(cardDiv);
            
            // Update total issues
            getElements('total-issues').innerText = allBtn.children.length;
        
            // tag add 
            const tag = document.createElement('div');
            let str='';
            element.labels.forEach( el =>{
                if(el=='bug'){
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FEECEC] text-[#EF4444] gap-2 flex"><span><i class="fa-solid fa-bug"></i></span>Bug</div>';
                } 
                else if( el=='help wanted' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FFF8DB] text-[#D97706] gap-2 flex"><span><i class="fa-regular fa-life-ring"></i></span>HELP WANTED</div>';
                }
                else if( el=='enhancement' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#cee9d2] text-[#37d906] gap-2 flex items-center"><span><i class="fa-solid fa-star"></i></span>Enhancement</div>';
                }
                else if( el=='good first issue' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#d5f1ee] text-[#06d9b2] gap-2 flex items-center"><span><i class="fa-solid fa-certificate"></i></span>GOOD FIRST ISSUE</div>';
                }
                else if( el=='documentation' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#dee3f1] text-[#0642d9] gap-2 flex items-center"><span><i class="fa-brands fa-files-pinwheel"></i></span>DOCUMENTATION</div>';   
                }
            })
            
            tag.classList.add('flex','flex-wrap', 'gap-2')
            tag.innerHTML = str;
            const tagId = 'tag-'+element.id;
            getElements(tagId).append(tag);


            // Priority capsule background color
            const priID = 'priority-'+element.id;
            const priority = getElements(priID);
            if( element.priority==='low' ) {
                priority.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]');
            }
            else if( element.priority==='medium' ) {
                priority.classList.add('bg-[#FFF6D1]', 'text-[#F59E0B]');
            }
            else if( element.priority==='high' ) {
                priority.classList.add('bg-[#FEECEC]', 'text-[#EF4444]');
            }

        };
    });

    // const labelStatus = 'open';
    getElements('label-open').addEventListener('click',()=>{
        // label background manage
        getElements('label-all').classList.remove('bg-[#422ad5]', 'text-white');
        getElements('label-open').classList.add('bg-[#422ad5]', 'text-white');
        getElements('label-close').classList.remove('bg-[#422ad5]', 'text-white');

        // get the container & empty it
        const allBtn = getElements('all-btn'); 
        allBtn.innerHTML = '';
        

        // travel to all card
        for(let element of data) {
            
            let status = element.status;
            if(status=='closed' ) continue;
            // data.forEach(element => {
            const cardDiv = document.createElement('div');

            // status update
            let open1='',close1='',open2='',close2='',border='';
            if(status=="open") {
                open1='';
                close1='hidden';
                border='border-green-500';
            }
            else {
                open2='hidden';
                close2='';
                border='border-[#A855F7]';
            }

            
            // card info added
            cardDiv.innerHTML = `
                <div class="card bg-base-100 shadow-md border-t-4 ${border} h-full">
                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <div class="flex">
                                <img class="${open2} ${close2}" src="./assets/Open-Status.png">
                                <img class="${open1} ${close1}" src="./assets/Closed- Status .png">
                            </div>
                            <div id='priority-${element.id}' class="px-7 py-2 rounded-full  gap-2 flex font-semibold">${element.priority.toUpperCase()}</div>
                        </div>
                        <div class="border-b-2 border-gray-300 space-y-2 py-5">
                            <h2 class="card-title">${element.title}</h2>
                            <p>${element.description}</p>
                            <div id="tag-${element.id}" class="flex flex-wrap gap-4 mt-5">
                            
                            </div>
                        </div>
                        <div class="space-y-3 pt-4">
                            <p class="text-[#64748B]">#1 ${element.author}</p>
                            <p class="text-[#64748B]">${element.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                    
                </div>
            `;

            allBtn.append(cardDiv);

            // Update total issues
            getElements('total-issues').innerText = allBtn.children.length;
            
        
            // tag add 
            const tag = document.createElement('div');
            let str='';
            element.labels.forEach( el =>{
                if(el=='bug'){
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FEECEC] text-[#EF4444] gap-2 flex"><span><i class="fa-solid fa-bug"></i></span>Bug</div>';
                } 
                else if( el=='help wanted' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FFF8DB] text-[#D97706] gap-2 flex"><span><i class="fa-regular fa-life-ring"></i></span>HELP WANTED</div>';
                }
                else if( el=='enhancement' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#cee9d2] text-[#37d906] gap-2 flex items-center"><span><i class="fa-solid fa-star"></i></span>Enhancement</div>';
                }
                else if( el=='good first issue' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#d5f1ee] text-[#06d9b2] gap-2 flex items-center"><span><i class="fa-solid fa-certificate"></i></span>GOOD FIRST ISSUE</div>';
                }
                else if( el=='documentation' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#dee3f1] text-[#0642d9] gap-2 flex items-center"><span><i class="fa-brands fa-files-pinwheel"></i></span>DOCUMENTATION</div>';   
                }
            })
            
            tag.classList.add('flex','flex-wrap', 'gap-2')
            tag.innerHTML = str;
            const tagId = 'tag-'+element.id;
            getElements(tagId).append(tag);


            // Priority capsule background color
            const priID = 'priority-'+element.id;
            const priority = getElements(priID);
            if( element.priority==='low' ) {
                priority.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]');
            }
            else if( element.priority==='medium' ) {
                priority.classList.add('bg-[#FFF6D1]', 'text-[#F59E0B]');
            }
            else if( element.priority==='high' ) {
                priority.classList.add('bg-[#FEECEC]', 'text-[#EF4444]');
            }

        };
    });

    // const labelStatus = 'close';
    getElements('label-close').addEventListener('click',()=>{
        // label background manage
        getElements('label-all').classList.remove('bg-[#422ad5]', 'text-white');
        getElements('label-open').classList.remove('bg-[#422ad5]', 'text-white');
        getElements('label-close').classList.add('bg-[#422ad5]', 'text-white');

        // get the container & empty it
        const allBtn = getElements('all-btn'); 
        allBtn.innerHTML = '';
        

        // travel to all card
        for(let element of data) {
            
            let status = element.status;
            if(status=='open' ) continue;
            // data.forEach(element => {
            const cardDiv = document.createElement('div');

            // status update
            let open1='',close1='',open2='',close2='',border='';
            if(status=="open") {
                open1='';
                close1='hidden';
                border='border-green-500';
            }
            else {
                open2='hidden';
                close2='';
                border='border-[#A855F7]';
            }

            
            // card info added
            cardDiv.innerHTML = `
                <div class="card bg-base-100 shadow-md border-t-4 ${border} h-full">
                    <div class="card-body">
                        <div class="flex justify-between items-center">
                            <div class="flex">
                                <img class="${open2} ${close2}" src="./assets/Open-Status.png">
                                <img class="${open1} ${close1}" src="./assets/Closed- Status .png">
                            </div>
                            <div id='priority-${element.id}' class="px-7 py-2 rounded-full  gap-2 flex font-semibold">${element.priority.toUpperCase()}</div>
                        </div>
                        <div class="border-b-2 border-gray-300 space-y-2 py-5">
                            <h2 class="card-title">${element.title}</h2>
                            <p>${element.description}</p>
                            <div id="tag-${element.id}" class="flex flex-wrap gap-4 mt-5">
                            
                            </div>
                        </div>
                        <div class="space-y-3 pt-4">
                            <p class="text-[#64748B]">#1 ${element.author}</p>
                            <p class="text-[#64748B]">${element.createdAt.slice(0,10)}</p>
                        </div>
                    </div>
                    
                </div>
            `;

            allBtn.append(cardDiv);
            
            // Update total issues
            getElements('total-issues').innerText = allBtn.children.length;
            
            // tag add 
            const tag = document.createElement('div');
            let str='';
            element.labels.forEach( el =>{
                if(el=='bug'){
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FEECEC] text-[#EF4444] gap-2 flex"><span><i class="fa-solid fa-bug"></i></span>Bug</div>';
                } 
                else if( el=='help wanted' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#FFF8DB] text-[#D97706] gap-2 flex"><span><i class="fa-regular fa-life-ring"></i></span>HELP WANTED</div>';
                }
                else if( el=='enhancement' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#cee9d2] text-[#37d906] gap-2 flex items-center"><span><i class="fa-solid fa-star"></i></span>Enhancement</div>';
                }
                else if( el=='good first issue' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#d5f1ee] text-[#06d9b2] gap-2 flex items-center"><span><i class="fa-solid fa-certificate"></i></span>GOOD FIRST ISSUE</div>';
                }
                else if( el=='documentation' ) {
                    str += '<div class="px-3 py-2 rounded-full border bg-[#dee3f1] text-[#0642d9] gap-2 flex items-center"><span><i class="fa-brands fa-files-pinwheel"></i></span>DOCUMENTATION</div>';   
                }
            })
            
            tag.classList.add('flex','flex-wrap', 'gap-2')
            tag.innerHTML = str;
            const tagId = 'tag-'+element.id;
            getElements(tagId).append(tag);


            // Priority capsule background color
            const priID = 'priority-'+element.id;
            const priority = getElements(priID);
            if( element.priority==='low' ) {
                priority.classList.add('bg-[#EEEFF2]', 'text-[#9CA3AF]');
            }
            else if( element.priority==='medium' ) {
                priority.classList.add('bg-[#FFF6D1]', 'text-[#F59E0B]');
            }
            else if( element.priority==='high' ) {
                priority.classList.add('bg-[#FEECEC]', 'text-[#EF4444]');
            }

        };
    });

};


// Search elements 
getElements('search-btn').addEventListener('click',()=>{
    const searchInput=getElements('search-input').value;
    if(searchInput.length===0) loadAll();
    else loadSearch(searchInput);
});

loadAll();