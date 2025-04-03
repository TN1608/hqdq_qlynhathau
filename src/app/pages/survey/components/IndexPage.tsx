import AnimatedContent from "@/app/components/ui/Animation/AnimatedContent";
import {ReviewForm} from "@/app/components/review-form";
import {useRouter} from 'next/router';
import {useEffect} from "react";

// @ts-ignore
export const IndexPage = ({setResult}) => {
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        console.log(id)
    }, [id]);
    return (
        <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={false}
            config={{tension: 80, friction: 20}}
            initialOpacity={0.2}
            animateOpacity
            scale={1.1}
            threshold={0.2}
        
            {/*Nha an 1*/}
            {id === '1' ? (
                <ReviewForm setResult={setResult} id={id}/>
            ) : (
                <>NOT FOUND</>
            )}
        </AnimatedContent>
    );
};