
const GetFormValuesForSqlInsert = () => {
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

const GetFormValuesForSqlUpdate = () => {
    let finalResult = [];
    let ref = 0;
    let form = document.getElementsByTagName('form')[0];
    if(!form) return;
    let inputs = form.getElementsByTagName('input');
    let labels = form.getElementsByTagName('label');
    // `FirstName` = 'tenflewe', 
    for(let i=0; i<inputs.length; i++)  {
        if(i>0) {
            finalResult.push("`"+labels[i].innerText+"` = '" + inputs[i].value + "'") ;
        } else {
            ref = inputs[i].value;
        }
    };
    finalResult = finalResult.join();
    finalResult = encodeURI(finalResult);
    return {finalResult, ref};
}

export {
    GetFormValuesForSqlInsert,
    GetFormValuesForSqlUpdate
    
}