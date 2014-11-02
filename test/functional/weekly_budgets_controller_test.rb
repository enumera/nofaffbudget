require 'test_helper'

class WeeklyBudgetsControllerTest < ActionController::TestCase
  setup do
    @weekly_budget = weekly_budgets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:weekly_budgets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create weekly_budget" do
    assert_difference('WeeklyBudget.count') do
      post :create, weekly_budget: { budget_id: @weekly_budget.budget_id, current_fund: @weekly_budget.current_fund, start_fund: @weekly_budget.start_fund, weekno: @weekly_budget.weekno }
    end

    assert_redirected_to weekly_budget_path(assigns(:weekly_budget))
  end

  test "should show weekly_budget" do
    get :show, id: @weekly_budget
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @weekly_budget
    assert_response :success
  end

  test "should update weekly_budget" do
    put :update, id: @weekly_budget, weekly_budget: { budget_id: @weekly_budget.budget_id, current_fund: @weekly_budget.current_fund, start_fund: @weekly_budget.start_fund, weekno: @weekly_budget.weekno }
    assert_redirected_to weekly_budget_path(assigns(:weekly_budget))
  end

  test "should destroy weekly_budget" do
    assert_difference('WeeklyBudget.count', -1) do
      delete :destroy, id: @weekly_budget
    end

    assert_redirected_to weekly_budgets_path
  end
end
