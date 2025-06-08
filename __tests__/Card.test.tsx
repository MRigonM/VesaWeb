import Card from "@/components/shared/Card";
import Logo from "@/assets/icons/logo.png";
import { screen} from "@testing-library/dom";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom"

describe("BlogCard", () => {
    it('needs to show title and body of the blog', () => {
        render(
            <Card icon={Logo.src} title="Title of Blog" description="Body of Blog" />
        )
    });
    expect(screen.getByText("Title of Blog")).toBeInTheDocument();

    expect(screen.getByText("Body of the Blog")).toBeInTheDocument();
})