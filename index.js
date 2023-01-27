class Gears{
    constructor(degStart,speed=1000){
      this.gearArray = []
      this.gearHTMLelement = [] 
      this.gearsRatio = []
      this.speed = speed/1000 
    }
    add(HTMLelement,degStart,gearRatio){
      degStart = (90+(30*degStart))%360  
      HTMLelement.style.transform = "rotate("+degStart+"deg"+")"
      this.gearHTMLelement.push(HTMLelement)
      this.gearArray.push(degStart)
      this.gearsRatio.push(360/gearRatio)
    }
    
    rotateClock(){
      for (let i = 0; i < this.gearsRatio.length; i++){
        this.rotateElement(i,this.gearsRatio[i]*this.speed)
      }
    }
     
    rotateElement(index,deg=0){      
      this.gearArray[index] += deg;
      this.gearHTMLelement[index].style.transform = "rotate("+this.gearArray[index]+"deg"+")"
    }      
  }
  
  const now = new Date();
  let gearsClass = new Gears(120,1000)
  const wallPaperLink = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5uw4-CEhsgtBe1cFi7a75KPAwLpGiHTX1cA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CBIwWrFmh-pWBbXsYsb4EpEXrl-hxBc6ng&usqp=CAU"]
  let change = -1
  let rectangle_1 = document.getElementById("rectangle_first")
  let rectangle_2 = document.getElementById("rectangle_second")
  let rectangle_3 = document.getElementById("rectangle_third")
  let digital_clock = document.getElementById("digital_clock")
  let body = document.getElementsByTagName("BODY")[0];
  
  gearsClass.add(rectangle_1,now.getSeconds()/5,60)
  gearsClass.add(rectangle_2,now.getMinutes()/5,60*60)
  gearsClass.add(rectangle_3,now.getHours()+(now.getMinutes()/60),60*60*12)
  
  
  let digitalClock = (element)=>{
    const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    });
    element.innerHTML = time;
  }
  
  let changeWallPaper = ()=>{
    const now = new Date();
    if(now.getHours() > 18 || now.getHours() < 7 && [-1,0].includes(change)){
      body.style.backgroundImage = "url("+wallPaperLink[0]+")"
      digital_clock.style.color = "#"+"FFFAE7"
      change = 1
    }
    else if(now.getHours() > 7 && now.getHours() < 18 && [-1,1].includes(change)){
      body.style.backgroundImage = "url("+wallPaperLink[1]+")" 
      digital_clock.style.color = "#"+"50577A"  
      change = 0
    } 
  }
  
  digitalClock(digital_clock)
  //changeWallPaper()
  
  setInterval(()=>{
   //changeWallPaper()
   gearsClass.rotateClock()
   digitalClock(digital_clock)
  },1000)