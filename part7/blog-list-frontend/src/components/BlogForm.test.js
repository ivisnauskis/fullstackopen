import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("event handler gets called with correct values", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const form = component.container.querySelector("form");
    const titleInput = component.container.querySelector("#title");
    const authorInput = component.container.querySelector("#author");
    const urlInput = component.container.querySelector("#url");

    fireEvent.change(titleInput, {
      target: { value: "testTitle" },
    });
    fireEvent.change(authorInput, {
      target: { value: "testAuthor" },
    });
    fireEvent.change(urlInput, {
      target: { value: "testUrl" },
    });

    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
  });
});
