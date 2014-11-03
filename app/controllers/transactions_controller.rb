class TransactionsController < ApplicationController
  # GET /transactions
  # GET /transactions.json
  def index
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])
    @transactions = @weekly_budget.transactions.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @transactions }
    end
  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])

    @transaction =@weekly_budget.transactions.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @transaction }
    end
  end

  # GET /transactions/new
  # GET /transactions/new.json
  def new
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])
    @transaction = Transaction.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @transaction }
    end
  end

  # GET /transactions/1/edit
  def edit
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])
    @transaction = @weekly_budget.transactions.find(params[:id])
  end

  # POST /transactions
  # POST /transactions.json
  def create
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])
    @transaction = @weekly_budget.transactions.new(params[:transaction])

    new_current_fund = @weekly_budget.current_fund - @transaction.amount

    weekly_budget_update = {}
    weekly_budget_update[:weekly_budget] = {}
    weekly_budget_update[:weekly_budget][:current_fund] = new_current_fund
    weekly_budget_update.to_json


    respond_to do |format|
      if @transaction.save
          @weekly_budget.update_attributes(weekly_budget_update[:weekly_budget])
        format.html { redirect_to weekly_budget_transaction_path(@weekly_budget, @transaction), notice: 'Transaction was successfully created.' }
        format.json { render json: @transaction, status: :created, location: weekly_budget_transaction_path(@weekly_budget, @transaction) }
      else
        format.html { render action: "new" }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /transactions/1
  # PUT /transactions/1.json
  def update
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])

    @transaction = @weekly_budget.transactions.find(params[:id])

    respond_to do |format|
      if @transaction.update_attributes(params[:transaction])
        format.html { redirect_to weekly_budget_transaction_path(@weekly_budget, @transaction), notice: 'Transaction was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transactions/1
  # DELETE /transactions/1.json
  def destroy
    @weekly_budget = WeeklyBudget.find(params[:weekly_budget_id])

    @transaction = @weekly_budget.transactions.find(params[:id])
    @transaction.destroy

    respond_to do |format|
      format.html { redirect_to weekly_budget_transactions_url }
      format.json { head :no_content }
    end
  end
end
