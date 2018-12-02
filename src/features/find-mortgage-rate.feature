Feature: Find a mortgage rate
  As a new customer
  I want to find the mortgage rates available
  So that I can decide whether to switch my mortgage to Nationwide

  @Test
  Scenario Outline: Find mortgage rates
    # Navigate to new mortgage
    Given I open the url "https://www.nationwide.co.uk"
    When I hover on Mortgages
    And I select Mortgage rates for new customers
    Then I should land on "Search for a Nationwide mortgage" page containing "search_for_nationwide_mortgage_header"
    # Find a mortgage
    When I select "do_you_have_nationwide_mortgage_no"
    Then I should see "type_of_mortgages"
    When I select "i'm_changing_lender"
    Then I should see "property_value_inputfield"
    When I fill "property_value_inputfield" with <propertyValue>
    And I fill "mortgage_amount_inputfield" with <mortgageAmount>
    And I fill "term_inputfield" with <termValue>
    And I select "find_mortgage_rate_button"
    Then I should be presented with available mortgages
    
    # Filter the products
    When I select "fixed_rate_checkbox"
    Then I wait for the filter to be applied
    When I select "product_withfee_checkbox"
    Then I wait for the filter to be applied
    # Validate the results
    Then I should see "2_years_Fixed"
    And I should see "3_years_Fixed"
    And I should see "5_years_Fixed"
    And I should see "10_years_Fixed"
    # apply for 5 years fixed remortgage
    When I select "more_info_apply"
    And I select "apply_5_years_fixed"
    Then I should land on "Start your remortgage application" page containing "start_your_remortgage_application"
   
    Examples:
      | propertyValue | mortgageAmount | termValue |
      | 300000        | 150000         | 30        |