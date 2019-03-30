var synth=window.speechSynthesis;

var textform=document.querySelector('form');
var txtInput=document.querySelector('#txtInput');
var divpitchVal=document.querySelector('#pitch-value');
var rngpitch=document.querySelector('#pitch');
var divrateVal=document.querySelector('#rate-value');
var rngrate=document.querySelector('#rate');
var drpLang=document.querySelector('#lang-select');
var button=document.querySelector('button');
var body=document.querySelector('body');

var voices=[];
getvoices =()=>{
    voices=synth.getVoices();
    console.log(voices);
    voices.forEach((voice)=>{
        var option=document.createElement('option');
        option.textContent=`${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        drpLang.appendChild(option);
    })
}

synth.onvoiceschanged=getvoices;

speak=()=>{
    body.style.background='#141414 url(img/Wave.gif)';
    body.style.backgroundRepeat='repeat-x';
    body.style.backgroundSize='100% 100%'
    if(synth.speaking){
        alert('already speaking....');
        return
    }
    if(txtInput.val!==''){
        var speaktext=new SpeechSynthesisUtterance(txtInput.value);
            speaktext.onend=e=>{
                alert('done reading..')
                body.style.background='#141414';
            }
            speaktext.onerror=e=>{
                alert('Something went wrong....')
            }

            var selectedVoice=drpLang.selectedOptions[0].getAttribute('data-name');
            voices.forEach(voice=>{
                if(voice.name==selectedVoice){
                    speaktext.voice=voice;
                }
            });
            speaktext.pitch=rngpitch.value;
            speaktext.rate=rngrate.value;
            synth.speak(speaktext)

    }

}
rngpitch.addEventListener('change',e=>{
    divpitchVal.textContent=rngpitch.value;
})

rngrate.addEventListener('change',e=>{
    divrateVal.textContent=rngrate.value;
})
textform.addEventListener('submit',e=>{
    e.preventDefault();
    speak()
})






