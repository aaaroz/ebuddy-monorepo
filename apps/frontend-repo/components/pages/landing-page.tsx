import LogoCollection from "@/components/molecules/logo-collections";
import AppBar from "@/components/organisms/app-bar";
import Features from "@/components/organisms/features";
import Footer from "@/components/organisms/footer";
import Hero from "@/components/organisms/hero";
import Divider from "@mui/material/Divider";

export default function LandingPage() {
    return (
        <main>
            <AppBar />
            <Hero />
            <LogoCollection />
            <Features />
            <Divider />
            <Footer />
        </main>
    );
}
