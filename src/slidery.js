"use strict";



window.onload = function () {

    const SLIDE_CLASS_NAME = "slide";
    const SLIDE_PRESENT = "present";

    activeSlideControl();

    function activeSlideControl() {        

        let controls = getControls();
        
        for(let i = 0; i < controls.left.length; i++) {
            let leftControl = controls.left[i];
            leftControl.onclick = function() {
                let slides = getSlides();
                goToDirection(slides, -1);
            };
        }

        for(let i = 0; i < controls.left.length; i++) {
            let rightControl = controls.right[i];
            rightControl.onclick = function() {
                let slides = getSlides();
                goToDirection(slides, 1);
            };
        }
    }

    function goToDirection(slides, inc) {
        let slidePresentIndex = findActiveSlideIndex(slides);
        if (slidePresentIndex >= 0 && 
            slidePresentIndex + inc < slides.length && 
            slidePresentIndex + inc >= 0
        ) {
            let nextSlide = slides[slidePresentIndex + inc];
            let currentSlide = slides[slidePresentIndex];

            elementRemoveClass(currentSlide, SLIDE_PRESENT);
            elementAddClass(nextSlide, SLIDE_PRESENT);
        }
    }

    function findActiveSlideIndex(slides) {
        for(let i = 0; i < slides.length; i++) {
            let slide = slides[i];
            if (elementHasClass(slide, SLIDE_PRESENT)) {
                return i;
            }
        }
        return -1;
    }

    function getControls() {
        let leftControls = document.getElementsByClassName("go-left");
        let rightControls = document.getElementsByClassName("go-right");

        return {
            right : rightControls,
            left : leftControls
        }
    }


    function getSlides() {
        let slides = [];
        let slideShows = document.getElementsByClassName("slide-show");
        for(let i = 0; i < slideShows.length; i++) {
            let slideShow = slideShows[i];
            let slidesOfSlideShow = slideShow.getElementsByClassName("slide");

            for(let j = 0; j < slidesOfSlideShow.length; j++) {
                slides.push(slidesOfSlideShow[j]);
            }
        }
        
        return slides;
    }

    function elementHasClass(element, className) {
        return element.className.indexOf(className) >= 0;
    }

    function elementRemoveClass(element, className) {
        element.className = element.className.replace(className, " ");
    }

    function elementAddClass(element, className) {
        element.className += " " + className;
    }



}


