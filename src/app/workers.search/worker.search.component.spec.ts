import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkerSearchComponent } from './worker.search.component';

describe('UserSearchComponent', () => {
    let component: WorkerSearchComponent;
    let fixture: ComponentFixture<WorkerSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WorkerSearchComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
