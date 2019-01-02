const slides = document.querySelectorAll('.slides .slide')
let currentSlide = 0
const slideInterval = setInterval(nextSlide, 5000)

function nextSlide () {
	slides[currentSlide].className = 'slide'
	currentSlide = (currentSlide + 1) % slides.length
	slides[currentSlide].className = 'slide showing'
}