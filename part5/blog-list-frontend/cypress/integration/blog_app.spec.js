describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "test",
      password: "password",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is show", function () {
    cy.contains("Log in");
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#usernameInput").type("test");
      cy.get("#passwordInput").type("password");
      cy.get("#loginButton").click();

      cy.wait(300);
      cy.contains("logged in");
    });

    it("fails with incorrect credentials", function () {
      cy.get("#usernameInput").type("wrong");
      cy.get("#passwordInput").type("wrong");
      cy.get("#loginButton").click();

      cy.wait(300);
      cy.get(".notification")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "password" });
    });

    it("A blog can be created", function () {
      cy.wait(300);
      cy.get("#togglableButton").click();
      cy.get("#title").type("title by cypress");
      cy.get("#author").type("author by cypress");
      cy.get("#url").type("url by cypress");
      cy.get("#createButton").click();

      cy.wait(300);
      cy.get(".notification")
        .should("contain", "has been added")
        .and("have.css", "color", "rgb(0, 128, 0)");
      cy.contains("title by cypress by author by cypress");
      cy.contains("Blog").should("have.length", 1);
    });

    describe("and there is blogs", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "blog by cypress",
          author: "firstAuthor",
          url: "firstUrl",
        });
      });

      it("should be able to like a blog", function () {
        cy.contains("blog by cypress");
        cy.get("#viewButton").click();
        cy.contains("Likes: 0");
        cy.get("#likeButton").click();
        cy.contains("Likes: 1");
      });

      it("should be able to delete a blog", function () {
        cy.contains("blog by cypress");
        cy.get("#viewButton").click();
        cy.get("#deleteButton").click();
        cy.get(".blogComponent").should("not.exist");
        cy.get(".notification")
          .should("contain", "has been deleted")
          .and("have.css", "color", "rgb(0, 128, 0)");
      });

      it("other users should not be able to delete a blog", function () {
        cy.request("POST", "http://localhost:3003/api/users", {
          username: "user",
          password: "password",
        });
        cy.get("#logoutButton").click();
        cy.login({ username: "user", password: "password" });
        cy.get("#viewButton").click();
        cy.get("#deleteButton").click();
        cy.get(".notification")
          .should("contain", "token missing or invalid")
          .and("have.css", "color", "rgb(255, 0, 0)");
      });

      it("blogs are sorted by likes", function () {
        cy.createBlog({
          title: "blog by cypress 2",
          author: "secondAuthor",
          url: "secondUrl",
          likes: 2,
        });
        cy.createBlog({
          title: "blog by cypress 3",
          author: "thirdAuthor",
          url: "thirdUrl",
          likes: 5,
        });

        cy.get(".blogComponent").then((blogs) => {
          cy.wrap(blogs[0]).find("button").click();
          cy.wrap(blogs[1]).find("button").click();
          cy.wrap(blogs[2]).find("button").click();

          cy.wrap(blogs[0]).contains("Likes: 5");
          cy.wrap(blogs[1]).contains("Likes: 2");
          cy.wrap(blogs[2]).contains("Likes: 0");
        });
      });
    });
  });
});
