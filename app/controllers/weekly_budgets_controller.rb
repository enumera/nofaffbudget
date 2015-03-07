class WeeklyBudgetsController < ApplicationController
  # GET /weekly_budgets
  # GET /weekly_budgets.json
  def index
    if params[:budget_id].nil?
      @weekly_budgets = WeeklyBudget.all
    else

      @budget = Budget.find(params[:budget_id])
      @weekly_budgets = @budget.weekly_budgets.all
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @weekly_budgets }
    end
  end

  # GET /weekly_budgets/1
  # GET /weekly_budgets/1.json
  def show
    if params[:budget_id].nil?
        @weekly_budget = WeeklyBudget.find(params[:id])
    else

      @budget = Budget.find(params[:budget_id])
      @weekly_budget = @budget.weekly_budgets.find(params[:id])
     end



    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @weekly_budget }
    end
  end

  # GET /weekly_budgets/new
  # GET /weekly_budgets/new.json
  def new
    if params[:budget_id].nil?
           @weekly_budget = WeeklyBudget.find(params[:id])

    else

      @budget = Budget.find(params[:budget_id])
 
      @weekly_budget = WeeklyBudget.new
    end


    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @weekly_budget }
    end
  end

  # GET /weekly_budgets/1/edit
  def edit
    if params[:budget_id].nil?
           @weekly_budget = WeeklyBudget.find(params[:id])

    else

    @budget = Budget.find(params[:budget_id])
    @weekly_budget = @budget.weekly_budgets.find(params[:id])
  end

  end

  # POST /weekly_budgets
  # POST /weekly_budgets.json
  def create
  if params[:budget_id].nil?
         @weekly_budget = WeeklyBudget.find(params[:id])
 
  else


      @budget = Budget.find(params[:budget_id])
      @weekly_budget = @budget.weekly_budgets.new(params[:weekly_budget])
  end


    respond_to do |format|
      if @weekly_budget.save
        if params[:budget_id].nil?
             format.html { redirect_to @weekly_budget, notice: 'Weekly budget was successfully created.' }
          format.json { render json: @weekly_budget, status: :created, location: @weekly_budget }
        else
           format.html { redirect_to budget_weekly_budget_path(@budget,@weekly_budget), notice: 'Weekly budget was successfully created.' }
          format.json { render json: @weekly_budget, status: :created, location: @weekly_budget }

        end

      else
        format.html { render action: "new" }
        format.json { render json: @weekly_budget.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /weekly_budgets/1
  # PUT /weekly_budgets/1.json
  def update
       if params[:budget_id].nil?
             @weekly_budget = WeeklyBudget.find(params[:id])

       else

      @budget = Budget.find(params[:budget_id])
      @weekly_budget = @budget.weekly_budgets.find(params[:id])
    end

    


    respond_to do |format|
      if @weekly_budget.update_attributes(params[:weekly_budget])
        if params[:budget_id].nil?
          format.html { redirect_to @weekly_budget, notice: 'Weekly budget was successfully updated.' }
          format.json { head :no_content }
        else
           format.html { redirect_to budget_weekly_budget_path(@budget,@weekly_budget), notice: 'Weekly budget was successfully updated.' }
          format.json { head :no_content }
        end
      else
        format.html { render action: "edit" }
        format.json { render json: @weekly_budget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /weekly_budgets/1
  # DELETE /weekly_budgets/1.json
  def destroy
       if params[:budget_id].nil?
     @weekly_budget = WeeklyBudget.find(params[:id])

      else

        @budget = Budget.find(params[:budget_id])
        @weekly_budget = @budget.weekly_budgets.find(params[:id])
      end

     

        @weekly_budget.destroy

    respond_to do |format|
    if params[:budget_id].nil?
      format.html { redirect_to weekly_budgets_url }
      format.json { head :no_content }
    else
      format.html { redirect_to budget_weekly_budgets_url }
      format.json { head :no_content }
    end

    end
  end



end
