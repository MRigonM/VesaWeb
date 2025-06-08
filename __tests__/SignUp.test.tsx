import Card from "@/components/shared/Card";
import Logo from "@/assets/icons/logo.png";
import { screen} from "@testing-library/dom";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom"

describe("SignUp", () => {
    it('needs to show Email and Password inputs', () => {
        render(
            <Card icon={Logo.src} title="Sign up" description="Sign up" />
        )
    });
    expect(screen.getByText("Sign up")).toBeInTheDocument();

    expect(screen.getByText("Sign up")).toBeInTheDocument();
})