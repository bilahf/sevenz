let id = null;
let data = [
    {
        'img': 'image/Danang.png',
        'name': 'Danang Haedar Guswanrinandi',
        'desc': 'Lahir di Tulungagung tanggal 5 September 2004, umur 19 tahun, berkuliah di Universitas Muhammadiyah Gresik jurusan Teknik Informatika, bertempat tinggal di perum GGH, serembi.'
    },
    {
        'img': 'image/Davi2.png',
        'name': 'Muh. Madavi Syah Putra',
        'desc': 'Hai kenalin aku davi, kota asalku dari probolinggo dan aku lahir tanggal 13 September 2003. Aku adalah mahasiswa Teknik informatika UMG, aku merantau ke gresik dan tinggal di daerah randuagung. Aku penyuka kucing jenis apapun, selain itu aku juga suka bermain game bareng teman2.'
    },
    {
        'img': 'image/Fitri.png',
        'name': 'Nabilah Fitriani',
        'desc': 'Hola aku nabilah fitriani, biasa dipanggil fitri dan aku lahir di Gresik tanggal 27 November 2003. Aku juga merupakan salah satu mahasiswa Teknik informatika, aku tinggal di pongangan Gresik. Aku penyuka kucing juga suka susu ultramilk rasa strawberry.'
    },
    {
        'img': 'image/Melin.png',
        'name': 'Lintang Ika Meilani Putri',
        'desc': 'Halo guys! Aku lahir pada tanggal 29 Mei 2004 di kota Gresik, aku mahasiswa prodi teknik informatika angkatan 2022, aku tinggal di PPS Suci Gresik, salam kenal ya! Aku sangat suka suasana pantai maupun laut dengan lagu shout out.'
    },
    {
        'img': 'image/amel.png',
        'name': 'Dano Fadilah Amelya Rizki',
        'desc': 'Hello! aku amel, aku tinggal di daerah gka dan aku lahir tanggal 24 Juli 2004 di Gresik. Aku mahasiswa Teknik informatika juga sebagai bendahara di himatif UMG. Aku selalu pose senyum ala pepsodent karena menurutku itu yang terbaik.'
    },
    {
        'img': 'image/Sasak.png',
        'name': 'Sasak Pamuji Santoso',
        'desc': 'Halo semua! aku sasak santoso, aku yang tertua di kelompok ini karena aku lahir tanggal 09 Agustus 2003 di Gresik. Aku senang berkenalan dengan orang baru, jadi bisa menambah relasi juga silaturahmi. Aku juga penyuka kucing dan pemilik resto ayam bakar santoso.'
    },
    {
        'img': 'image/Putri.png',
        'name': 'Rhizky Amalia Putri',
        'desc': 'Hay rek aku putri, aku lahir di Gresik tanggal 02 Oktober 2003 dan bertempat tinggal di jalan sunan giri Gresik. Aku selalu happy kiyowo dan ceria, aku juga suka kulineran bareng partner sejatiku.'
    }
];

const makeVariable = (id) => {
    return document.querySelector(`#${id}`);
}

const input = (id, type='text', label='', placeholder='') => {
    return `
    <label>${label}</label><br>
    <input type="${type}" id="${id}" placeholder="${placeholder}"><br>
    `;
}

const textarea = (id, label='', placeholder='') => {
    return `
    <label>${label}</label><br>
    <textarea id="${id}" placeholder="${placeholder}"></textarea><br>
    `;
}

const button = (id, label) => {
    return `<button id="${id}">${label}</button>`;
}

const div = (id) => {
    return `<div id="${id}"></div>`;
}

const editData = (index) => {
    imgSrc.value = data[index].img;
    nameInput.value = data[index].name;
    descInput.value = data[index].desc;
    id = index;
    modal.classList.add("show");
}

const deleteData = (index) => {
    data.splice(index, 1);
    loadData(data, dataList);
}

const loadData = (data, element) => {
    element.innerHTML = '';
    let i = 0;
    data.forEach(item => {
        element.innerHTML += `
        <div class="item">
            <img src="${item.img}" alt="Image ${i + 1}">
            <div class="description">
                <h1>${item.name}</h1>
                <p id="desc${i}">${item.desc}</p>
                <button onclick="editData(${i})" class="edit-btn">Edit</button>
                <button onclick="deleteData(${i})" class="delete-btn">Delete</button>
                <button onclick="showStory(${i})" class="story-btn">Story</button>
            </div>
        </div>
        `;
        i++;
    });
}

const clear = () => {
    imgSrc.value = '';
    nameInput.value = '';
    descInput.value = '';
    id = null;
}

const showStory = (index) => {
    const storyFile = `stories/story${index}.txt`; // Assumes your .txt files follow a naming convention like story0.txt, story1.txt, etc.

    const xhr = new XMLHttpRequest();
    xhr.open('GET', storyFile, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const text = xhr.responseText;
                document.querySelector(`#desc${index}`).textContent = text;
                data[index].desc = text; // Update the data array as well
            } else {
                document.querySelector(`#desc${index}`).textContent = "Story not found.";
            }
        }
    };
    xhr.send();
};

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('#content')
    content.innerHTML += button('btnAddNew', 'Add New');
    content.innerHTML += div('dataList');
    content.innerHTML += `
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            ${input('imgSrc', 'text', 'Image Source', 'Masukkan URL Gambar')}
            ${input('nameInput', 'text', 'Name', 'Masukkan Nama')}
            ${textarea('descInput', 'Description', 'Masukkan Deskripsi')}
            ${button('btnSave', 'Save')}
            ${button('btnClear', 'Clear')}
        </div>
    </div>
    `;

    const imgSrc = makeVariable('imgSrc');
    const nameInput = makeVariable('nameInput');
    const descInput = makeVariable('descInput');
    const btnSave = makeVariable('btnSave');
    const btnClear = makeVariable('btnClear');
    const dataList = makeVariable('dataList');
    const btnAddNew = makeVariable('btnAddNew');
    const modal = makeVariable('modal');

    const modalClose = document.querySelector(".close");

    loadData(data, dataList);

    btnAddNew.addEventListener('click', () => {
        clear();
        modal.classList.add("show");
    });

    btnSave.addEventListener('click', () => {
        if (id == null) {
            data.push({
                'img': imgSrc.value,
                'name': nameInput.value,
                'desc': descInput.value
            });
        } else {
            data[id].img = imgSrc.value;
            data[id].name = nameInput.value;
            data[id].desc = descInput.value;
        }
        modal.classList.remove("show");
        loadData(data, dataList);
        clear();
    });

    btnClear.addEventListener('click', () => {
        clear();
    });

    modalClose.onclick = function() {
        modal.classList.remove("show");
        clear();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove("show");
            clear();
        }
    }
});