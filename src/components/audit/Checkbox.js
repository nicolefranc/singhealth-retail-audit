import { useEffect, useRef } from "react"
import tick from '../../assets/images/tick.png';
import wrong from '../../assets/images/wrong.png';
import na from '../../assets/images/not-applicable.png';

export default function Checkbox({ index, compliance, toggleCompliance }) {
    const imgRef = useRef(null);
    const complianceRef = useRef(compliance);

    useEffect(() => {
        complianceRef.current = compliance;
        updateImgSrc(imgRef, compliance);
    }, [compliance])
    
    const handleClick = () => {
        switch(complianceRef.current) {
            case false:
                complianceRef.current = null; break;
            case null:
                complianceRef.current = true; break;
            default:
                complianceRef.current = false; break;
        }

        updateImgSrc(imgRef, complianceRef.current);
        if (toggleCompliance) toggleCompliance(complianceRef.current, index);
    }

    const updateImgSrc = (imgRef, compliance) => {
        const img = imgRef.current;
        switch (compliance) {
            case false: 
                img.src = na; img.alt = 'N/A'; break;
            case null: img.src = tick; img.alt = '1'; break;
            default: img.src = wrong; img.alt = '0'; break;
        }
    }
    return (
        <img ref={imgRef} onClick={handleClick} alt="1" width={50} />
    )
}