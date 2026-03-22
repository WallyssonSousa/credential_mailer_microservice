export interface ProjectProps {
  id: string;
  name: string;
  primaryColor: string;
  logoUrl?: string;
  loginUrl: string;
}

export class Project {
  private id: string;
  private name: string;
  private primaryColor: string;
  private logoUrl?: string;
  private loginUrl?: string;

  constructor(props: ProjectProps) {
    this.id = props.id;
    this.name = props.name;
    this.primaryColor = props.primaryColor;
    this.logoUrl = props.logoUrl;
    this.loginUrl = props.loginUrl;
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

  public getLoginUrl(): string | undefined {
    return this.loginUrl;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setPrimaryColor(color: string) {
    this.primaryColor = color;
  }

  public setLogoUrl(url?: string) {
    this.logoUrl = url;
  }

  public setLoginUrl(url?: string) {
    this.loginUrl = url;
  }
}