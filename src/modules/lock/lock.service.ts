import { Injectable } from '@nestjs/common';

// In-memory lock service to cover concurrency issues.
// Service can be remade to utilize any other better locking mechanism (for example Redis)
@Injectable()
export class LockService {
  private locks = new Set<string>();

  public lock(lockKey: string): boolean {
    if (this.locks.has(lockKey)) {
      console.log(`Lock ${lockKey} is active, skipping execution.`);
      return false;
    }

    this.locks.add(lockKey);

    console.log(`Lock ${lockKey} is locked.`);
    return true;
  }

  public unLock(lockKey: string): void {
    this.locks.delete(lockKey);

    console.log(`Lock ${lockKey} is unlocked.`);
  }
}
