
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

// loadAll();