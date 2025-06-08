import Card from "@/components/shared/Card";
import Logo from "@/assets/icons/logo.png";
import { screen} from "@testing-library/dom";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom"

describe("NewBody", () => {
    it('needs to show title and body of the blog', () => {
        render(
            <Card icon={Logo.src} title="Title of News" description="Body of News" />
        )
    });
    expect(screen.getByText("Title of News")).toBeInTheDocument();

    expect(screen.getByText("Body of News")).toBeInTheDocument();
})