import React from 'react';
import { Page, usePDF, Text, Document, StyleSheet } from '@react-pdf/renderer';

//downloading as text file logic
// export const DownloadFile = (jobDescription)=>{
//         const{message,fileName} = jobDescription;
//         const textToBLOB = new Blob([message], { type: 'text/plain' });
//         const sFileName = fileName;	   // The file to save the data.

//         let newLink = document.createElement("a");
//         newLink.download = sFileName;

//         if (window.webkitURL != null) {
//             newLink.href = window.webkitURL.createObjectURL(textToBLOB);
//         }
//         else {
//             newLink.href = window.URL.createObjectURL(textToBLOB);
//             newLink.style.display = "none";
//             document.body.appendChild(newLink);
//         }

//         newLink.click();
        

// }

//logic and styles for downloading pdf file

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 16,
        textAlign: 'center',
        color: 'blue',
        fontWeight : 7,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

const PdfFile = ({ text }) => (
    <Document>
        <Page style={styles.body}>
            <Text style={styles.header}>
                SRI ESHWAR COLLEGE OF ENGINEERING
            </Text>
            <Text style={styles.text}>
                {/* <pre> */}
                {text}
                {/* </pre> */}
            </Text>

            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} / ${totalPages}`
            )} fixed />


        </Page>
    </Document>
);

export default PdfFile;