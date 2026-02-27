export interface ProjectProps {
  id: string;
  name: string;
  primaryColor: string;
  logoUrl?: string;
}

export class Project {
  private readonly id: string;
  private readonly name: string;
  private readonly primaryColor: string;
  private readonly logoUrl?: string;

  constructor(props: ProjectProps) {
    this.id = props.id;
    this.name = props.name;
    this.primaryColor = props.primaryColor;
    this.logoUrl = props.logoUrl;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrimaryColor(): string {
    return this.primaryColor;
  }

  public getLogoUrl(): string | undefined {
    return this.logoUrl;
  }
}