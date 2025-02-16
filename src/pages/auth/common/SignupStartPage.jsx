import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignupStartPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type");

    useEffect(() => {
        if (userType === "caregiver") {
            navigate("/signup/caregiver/profile");
        } else if (userType === "admin") {
            navigate("/signup/admin/register");
        } else {
            navigate("/"); // 잘못된 접근 시 첫 화면으로 리디렉션
        }
    }, [userType, navigate]);

    return null; // 아무것도 렌더링하지 않고 리디렉션만 수행
};

export default SignupStartPage;