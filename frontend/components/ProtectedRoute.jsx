"use client"
import { createContext, useContext, useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import useHasMounted from "@/hooks/useHasMounted";  

const ProtectedRoute = ({ children, adminOnly=false }) => {
    const { user, loading } = useAuth();
    const hasMounted = useHasMounted();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!loading && hasMounted) {
            if (!user) {
                router.replace("/login");
            } else if (adminOnly && !user.is_admin) {
                router.replace("/unauthorized");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, loading, hasMounted, adminOnly, router]);

    if (loading || !hasMounted || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-t-blue-600 border-gray-200"></div>
                    <h2 className="text-xl font-semibold">Checking Authorization</h2>
                    <p className="text-sm text-gray-500 text-center">Verifying your access — this only takes a moment.</p>
                </div>
            </div>
        )
    }
    
    return <>{children}</>
}

export default ProtectedRoute;