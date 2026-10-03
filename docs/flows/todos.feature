# Given/Background = state. When = one action. Then = what the user sees.
Feature: Todos

  Background:
    Given user is signed in

  Scenario: Empty list
    When user opens the list
    Then user sees an empty list

  Scenario: Add
    Given user is on the list
    When user adds a todo
    Then user sees that todo

  Scenario: Complete
    Given user has a todo
    When user completes it
    Then user sees it marked done

  Scenario: Delete
    Given user has a todo
    When user deletes it
    Then user does not see that todo

  Rule: Filter
    Background:
      Given user has an open todo
      And user has a done todo

    Scenario: Open
      When user filters to open
      Then user sees only the open todo

    Scenario: Done
      When user filters to done
      Then user sees only the done todo

    Scenario: All
      Given user is filtering to done
      When user filters to all
      Then user sees both todos

    Scenario: Empty open
      Given user has no open todos
      When user filters to open
      Then user sees an empty open list
