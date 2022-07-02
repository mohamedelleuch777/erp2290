import React, { useState } from "react";

export default function FormManipulator(){
    let finalResult = [];
    let form = document.getElementsByTagName('form')[0];
    if(!form) return;
    let inputs = form.getElementsByTagName('input');
    for(let i=0; i<inputs.length; i++)  {
        if(i>0) {
            finalResult.push("'" + inputs[i].value + "'") ;
        } else {
            finalResult.push("NULL");
        }
    };
    finalResult = finalResult.join();
    finalResult = encodeURI(finalResult);
    return finalResult;
}