import React from 'react';
import { useEffect,useState} from 'react';
import { useIntl } from 'react-intl';
import {Stack,Box,Layout,Typography,Button} from '@strapi/design-system'
//import DistrictApiHandler from '../../api/districlist';
import { useFetchClient }  from '@strapi/helper-plugin';
import {statusText,messageText,colorText,buttonText}from '../CommonFile/index'

 const publisherEmail=[
    {
      email:'gaurab.kumar@fosteringlinux.com',
    },
    {
      email:'mohammad.farhan@fosteringlinux.com',
    },
    {
      email:'publisher@test.com',
    },
    {
      email:'super.admin@test.com'
    },
]

const ReviewFlow =  ({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) => {
  const { formatMessage } = useIntl();
  const [review,setReview]=useState("");
  const [reviewStatus,setReviewStatus]=useState("");
  const [reviewColor,setReviewColor]=useState("primary600");
  const [doneButton,setDoneButton]=useState(false);
  const [rejectButton,setRejectButton]=useState(false);
  const [reviewButton,setReviewButton]=useState(false);
  const {get}=useFetchClient()
 
    useEffect(()=>{
    
      setValueFromprom(value) // Get Value of review status and set Color and Text
      fetchAdminDetails(value);// Get User Details which has Updated review button

    },[])
    useEffect(()=>{
     
      createProps(reviewStatus)// Create props and upload value on dtatabase
    },[reviewStatus])


    const  setValueFromprom=((value)=>{
      if(value===undefined){
        setReview(messageText.textDraft)
        setReviewColor(colorText.colorDraft) 
        setReviewStatus(statusText.statusDraft)
    
      } else{
      
        setReviewStatus(value)
         if(value==statusText.statusReview){
          setReview(messageText.textReview)
          setReviewColor(colorText.colorReview) 
         }   
         else if(value==statusText.statusApproved){
          setReview(messageText.textApproved)
          setReviewColor(colorText.colorApproved)  
         } 
         else if(value==statusText.statusReject){
          setReview(messageText.textReject)
          setReviewColor(colorText.colorReject)  
         } else{
          setReview(messageText.textDraft)
          setReviewColor(colorText.colorDraft)  
           
         }   
      }  
    })

   const fetchAdminDetails=  ( async (value1)=>{
    
     if(value1==statusText.statusApproved){
     
        setDoneButton(false)
        setRejectButton(false)
        setReviewButton(false)
        setReview("")
        return
     }
    
       const requestURL = `/npistrapi/getadmin/`;
       const adminList = await get(requestURL)
       let emailFound=false;
       publisherEmail.forEach(item=>{
        if(adminList.data.email==item.email){
          emailFound=true;
          return;
        }
       })
       if(emailFound){
       // console.log("equalssssssff999999999 "+adminList.data.email)
          if(value1==undefined || value1==statusText.statusDraft|| value1==statusText.statusReject){
      
            setDoneButton(true)
            setRejectButton(false)
            setReviewButton(false)
          }
          else if(value1==statusText.statusReview){
           
            setDoneButton(true)
            setRejectButton(true)
            setReviewButton(false)
            setReview(messageText.textApproved1)
            setReviewColor(colorText.colorSend)
          }
          else{
          
            setDoneButton(true)
            setRejectButton(true)
            setReviewButton(false)
            setReview(messageText.textApproved1)
            setReviewColor(colorText.colorSend)
          }  
       }
       else{
        
          if(value1==statusText.statusReview){
           
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(false)
              setReview(messageText.textSend)
              setReviewColor(colorText.colorSend)
            }else{
            
              setDoneButton(false)
              setRejectButton(false)
              setReviewButton(true)
            }
       }

  })
  const handleDoneEvent=(async  ()=> {
   
     setReviewStatus(statusText.statusApproved)
     setReview(messageText.textApproved)
        setReviewColor(colorText.colorApproved) 
  })
  const handleRejectEvent=(async  ()=> {
   
    setReviewStatus(statusText.statusReject)
    setReview(messageText.textReject)
    setReviewColor(colorText.colorReject) 
   
  })
  const handleReviewedEvent=(async  ()=> {
    
    setReviewStatus(statusText.statusReview)
    setReview(messageText.textReview)
    setReviewColor(colorText.colorReview) 
     
  })
  const createProps=(async  (val)=> {   
    //console.log("props  data my data check "+val)
    description='';
    disabled=false;
    error='';
    intlLabel='';
    name=name;
    placeholder='';
    required=required;
    onChange=onChange({target: {name, value: val, type: 'string' }})
    value=val
  })
  
  return (
      <Box>
        <Layout >  
          <Stack horizontal spacing={4}>
              {doneButton ? 
                <Button 
                variant="default" onClick={handleDoneEvent}>{buttonText.review}</Button> 
              :null}
              {rejectButton ?
                <Button variant="default" onClick={handleRejectEvent}>{buttonText.reject}</Button>:null
              }
              {reviewButton ?
                <Button variant="default" onClick={handleReviewedEvent}>{buttonText.sendReview}</Button>:null
              }
                
          </Stack> 
      <div  style={{margin: "10px"}}>
          <Typography 
              textColor={reviewColor}
              variant="Omega">{review}</Typography> 
     </div>
         

        </Layout>
      </Box> 
  );
};

export default ReviewFlow;
