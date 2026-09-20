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
