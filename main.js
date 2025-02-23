//teacherBody section
//selectors

let teacherForm = document.getElementById('teacherForm')
let nameInput = document.getElementById('name')
let surNameInput = document.getElementById('surName')
let gradeInput = document.getElementById('ball')
let forSurNameLabel = document.getElementById('forSurName')
let forNameLabel = document.getElementById('forName')

let teacherBody = document.getElementById('teacherBody')
let studentBtn = document.getElementById('studentBtn')
let studentBtn1 = document.getElementById('studentBtn1')
let teachBtn = document.getElementById('teachBtn')
let teachBtn1 = document.getElementById('teachBtn1')
let students = document.getElementById('students')

let table = document.getElementById('studentsTable')
let dataUsers = []

let addBallForm = document.getElementById('addBallForm')

//function
teacherForm.addEventListener('submit', function (event) {
	event.preventDefault()

	testUsers()
})

function testUsers() {
	count = 0
	if (nameInput.value.trim() != '') {
		count++
	}
	if (surNameInput.value.trim() != '') {
		count++
	}
	if (count++ == 2) {
		creat()
	}
}
function creat() {
	dataUsers.push({
		name: nameInput.value,
		surname: surNameInput.value,
		date: 0,
		ball: 0,
		count: 0,
	})
	nameInput.value = ''
	surNameInput.value = ''

	localStorage.setItem('users', JSON.stringify(dataUsers))
	read()
}

;(function () {
	dataUsers = JSON.parse(localStorage.getItem('users'))
		? JSON.parse(localStorage.getItem('users'))
		: []

	read()
})()

function read() {
	table.innerHTML = ''
	dataUsers.map((obj, index) => {
		table.innerHTML += `
			<tr class = "mx-auto text-[13px] sm:text-[15px] md:text-[20px]">
				<td class ="mx-auto text-center p-[10px] bg-[#FDD9B5] border-solid border-black border-[1px]">${obj.name}</td>
				<td class ="mx-auto text-center p-[10px] bg-[#B5B8B1]  border-black border-[1px]">${obj.surname}</td>
				<td class ="mx-auto text-center p-[10px] bg-[#FDD9B5] border-black border-[1px]">${obj.ball}</td>
				<td class ="mx-auto text-center p-[10px] bg-[#B5B8B1] border-black border-[1px]">${obj.date}</td>
				<td class ="mx-auto text-center p-[10px] bg-[#FDD9B5] border-black border-[1px]"><button class='text-[20px] text-green-400' id="btn" onclick="openClose(${index})"><i class='bx bx-plus-medical'></i></button></td>
			</tr>
		`
	})
}
let btn = document.getElementById('btn')
addBallForm.addEventListener('submit', function (event) {
	event.preventDefault()
	let date = new Date()
	let index = addBallForm.dataset.index

	updata(date, index)
	openClose()
})
function openClose(index) {
	addBallForm.classList.toggle('scale-0')
	addBallForm.dataset.index = index
}
function updata(date, index) {
	dataUsers.forEach(function (value, key) {
		if (key == index) {
			value.ball = value.ball + +gradeInput.value
			value.date = date.toLocaleDateString()
			localStorage.setItem('users', JSON.stringify(dataUsers))
			gradeInput.value = ''
			read()
		}
	})
}

function open() {
	students.classList.toggle('translate-x-[-100%]')
	teacherBody.classList.toggle('translate-x-[-100%]')
	teacherBody.classList.toggle('scale-[0.9]')
	setTimeout(() => {
		students.classList.toggle('scale-[0.9]')
	}, 1000)
}
function closeThis() {
	teacherBody.classList.toggle('translate-x-[-100%]')
	teacherBody.classList.toggle('z-20')
	students.classList.toggle('translate-x-[-100%]')
	students.classList.toggle('scale-[0.9]')

	setTimeout(() => {
		teacherBody.classList.toggle('scale-[0.9]')
	}, 1000)
}
studentBtn.addEventListener('click', open)
teachBtn1.addEventListener('click', closeThis)
