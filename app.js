class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150; 
        this.isPlying = null;

    }
  activePad(){
    this.classList.toggle("active");
    }
  repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // LOOP OVER THE PADS
        activeBars.forEach(bar => {
          bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
          if (bar.classList.contains("active")) {
            if (bar.classList.contains("kick-pad")) {
            this.kickAudio.currentTime = 0;
            this.kickAudio.play();
            }
            if (bar.classList.contains("snare-pad")) {
              this.snareAudio.currentTime = 0; 
              this.snareAudio.play();
            }
            if (bar.classList.contains("hihat-pad")) {
              this.hihatAudio.currentTime = 0;
              this.hihatAudio.play();
            }
          }
        });
        this.index++;
        
       
  }
  start() {
    const interval = (60/this.bpm)*1000;
    if(this.isPlying){
     //CLEAR INTERVAL
     clearInterval(this.isPlying);
     this.isPlying = null;
    }else{
       //CHECK IF THIS IS PLAYING
    
      this.isPlying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn(){
    if(!this.isPlying){
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    }else{
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");

    }
  }
}
const drumKit = new DrumKit();
drumKit.pads.forEach(pad =>{
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function() {
    this.style.animation = "";
  });
});
drumKit.playBtn.addEventListener("click", function() {
  drumKit.updateBtn();
  drumKit.start(); 
} );
