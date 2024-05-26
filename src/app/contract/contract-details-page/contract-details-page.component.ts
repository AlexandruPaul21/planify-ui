import { Component, OnInit } from '@angular/core';
import { ContractDto } from '../../integration/domain/ContractDto';
import { ContractService } from '../../integration/service/contract.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import ContractStatus = ContractDto.ContractStatusEnum;
import { ReviewService } from '../../integration/service/review.service';
import { CreateReviewDto } from '../../integration/domain/CreateReviewDto';
const PRICE_DATE_EDITABLE_STATES = [ContractStatus.ORDERED, ContractStatus.DECLINED_PROVIDER, ContractStatus.DECLINED_CLIENT]

@Component({
  selector: 'app-contract-details-page',
  templateUrl: './contract-details-page.component.html',
  styleUrls: ['./contract-details-page.component.scss'],
  providers: [MessageService],
})
export class ContractDetailsPageComponent implements OnInit {
  public workflowProvider: Map<ContractStatus, ContractStatus[]> = new Map(
    [
      [ContractStatus.ORDERED, [ContractStatus.DECLINED_PROVIDER, ContractStatus.ACCEPTED_PROVIDER, ContractStatus.CANCELLED]],
      [ContractStatus.DECLINED_PROVIDER, [ContractStatus.CANCELLED]],
      [ContractStatus.DECLINED_CLIENT, [ContractStatus.ACCEPTED_PROVIDER, ContractStatus.DECLINED_PROVIDER, ContractStatus.CANCELLED]],
      [ContractStatus.ACCEPTED_PROVIDER, [ContractStatus.CANCELLED]],
      [ContractStatus.ACCEPTED_CLIENT, [ContractStatus.STARTED, ContractStatus.CANCELLED]],
      [ContractStatus.FINISHED, [ContractStatus.PAID]],
    ]
  );

  public workflowClient: Map<ContractStatus, ContractStatus[]> = new Map(
    [
      [ContractStatus.ORDERED, [ContractStatus.CANCELLED]],
      [ContractStatus.ACCEPTED_PROVIDER, [ContractStatus.ACCEPTED_CLIENT, ContractStatus.DECLINED_CLIENT, ContractStatus.CANCELLED]],
      [ContractStatus.DECLINED_PROVIDER, [ContractStatus.ORDERED, ContractStatus.CANCELLED]],
      [ContractStatus.STARTED, [ContractStatus.FINISHED]],
      [ContractStatus.FINISHED, [ContractStatus.PAID]],
    ]
  )

  public createReviewDto: CreateReviewDto = {
    rating: 0,
    title: '',
    text: '',
    contractId: '',
  };
  public contract: ContractDto | null = null;
  public loading: boolean = false;
  public needsReview: boolean = false;
  public reviewPageVisible: boolean = false;
  public role: string = '';

  public workflowMode = false;
  public workflowStatus: ContractStatus = ContractStatus.ORDERED;

  public acceptedStatuses: ContractStatus[] = [];

  public constructor(
    private contractService: ContractService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private reviewService: ReviewService,
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id')!!;
    this.contract = await this.contractService.findById(id);

    this.role = localStorage.getItem('role')!!;

    if (this.role == 'CLIENT') {
      this.acceptedStatuses = this.workflowClient.get(this.contract.status)!!;
    } else {
      this.acceptedStatuses = this.workflowProvider.get(this.contract.status)!!;
    }

    this.contract.contractDate = new Date(this.contract.contractDate);
    this.loading = false;

    if (this.contract == null) {
      this.needsReview = false;
    } else {
      const contractReviewState = await this.reviewService.getReviewStateByContractId(this.contract.id);
      this.needsReview = this.contract.status === ContractStatus.PAID &&
        (
          (this.role === 'PROVIDER' && !contractReviewState.providerReviewed) ||
          (this.role === 'CLIENT' && !contractReviewState.clientReviewed)
        )
      this.createReviewDto.contractId = this.contract.id;
    }
  }

  public isReviewSaveEnabled(): boolean {
    return this.createReviewDto.title != '' && this.createReviewDto.text != '' && this.createReviewDto.rating > 0;
  }

  public goToStatus(status: ContractStatus) {
    this.workflowStatus = status;
    this.workflowMode = true;
  }

  public async refreshStatus(): Promise<void> {
    this.workflowMode = false;
    await this.ngOnInit();
  }

  public async saveInformation(): Promise<void> {
    this.contract!!.status = this.workflowStatus;

    try {
      await this.contractService.updateContract(this.contract!!);
      this.messageService.add({
        severity: 'success',
        summary: `Contract successfully updated`,
        detail: 'Check later for updates',
      });
    } catch (e: unknown) {
      if (e instanceof HttpErrorResponse) {
        this.messageService.add({
          severity: 'danger',
          summary: `Contract successfully updated`,
        });
      }
    } finally {
      this.workflowMode = false;
      await this.ngOnInit();
    }
  }

  public isInEditableState(contractState: ContractStatus): boolean {
    return PRICE_DATE_EDITABLE_STATES.find(state => contractState === state) != null;
  }

  public clearCreateReview(): void {
    this.createReviewDto = {
      ...this.createReviewDto,
      title: '',
      text: '',
      rating: 0,
    }
  }

  public async saveReviewClicked(): Promise<void> {
    switch (this.role) {
      case 'PROVIDER':
        await this.reviewService.createProviderReview(this.createReviewDto);
        break;
      case 'CLIENT':
        await this.reviewService.createClientReview(this.createReviewDto);
        break;
    }
    this.messageService.add({
      severity: 'success',
      summary: `Review added`,
      detail: 'The review was added successfully',
    });
    await this.ngOnInit();
  }
}
