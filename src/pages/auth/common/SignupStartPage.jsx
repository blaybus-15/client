import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SignupStartPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        if (role === "CAREGIVER") {
            navigate("/signup/caregiver/profile");
        } else if (role === "ADMIN") {
            navigate("/signup/admin/center/register");
        } else {
            navigate("/"); // 잘못된 접근 시 첫 화면으로 리디렉션
        }
    }, [role, navigate]);

    return null; // UI가 필요 없는 경우
};

export default SignupStartPage;