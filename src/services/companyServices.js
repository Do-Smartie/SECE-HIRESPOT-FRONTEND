
//confirmation for company adding process
export const isComapanyAdded = (Success)=>{

    return Success;
}

//confirmation for company Updating process

export const isCompanyUpdated = (message)=>{

    return message === "Company Details Updated Successfully..."?true:false;
}