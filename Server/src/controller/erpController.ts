import { Controller, Route, Get, Tags, Query } from "tsoa";
import { Response } from "express";
import erpApi from "../../helper/utils/erpApi";
import { ErpHeaders, parseHeaders } from "../../helper/types/header";
import { HttpStatus } from "../../helper/config/httpStatus";
import { t } from "../../helper/config/localization";
import { IBranchRepo, BranchRepo } from "../repo/branchRepo";
import { branches } from "../../temp_db/branches";

const branchRepo: IBranchRepo = new BranchRepo();
@Route("api/branches")
@Tags("Branch")
class ERPController extends Controller {
  private erpApi!: erpApi;

  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  private initializeERPApi(countryCode: string): void {
    const urls = JSON.parse(process.env.ERP_URL as string);
    const apiKeys = JSON.parse(process.env.ERP_API_KEY as string);
    const clientKeys = JSON.parse(process.env.ERP_CLIENT_KEY as string);

    const baseURL = urls[countryCode];
    const customHeadersString = `
      api_key: ${apiKeys[countryCode]}
      client_key: ${clientKeys[countryCode]}
    `;

    const customHeaders: ErpHeaders = parseHeaders(customHeadersString);

    this.erpApi = new erpApi(baseURL, customHeaders);
  }

  @Get("erpsync")
  async fetchData(
    @Query() countryCode: string
  ): Promise<{ data?: any; error?: string }> {
    try {
      let responseData;
      if ((process.env.FETCH_FROM_ERP || "0") == "1") {
        this.initializeERPApi(countryCode);

        responseData = await this.erpApi.handleExpressGet(
          "/api/MasterApi/Locations"
        );

        if (!Array.isArray(responseData)) {
          throw {
            status: HttpStatus.HTTP_BAD_REQUEST,
            message: t.an_error_occurred,
          };
        }
      } else {
        responseData = branches;
      }
      const [isDataUpdated, error, httpStatus] =
        await branchRepo.createOrUpdateFromERP(responseData);

      if (error) {
        this.setStatus(HttpStatus.HTTP_BAD_REQUEST);
        return { error: error.message };
      }
      this.setStatus(httpStatus);
      return { data: isDataUpdated };
    } catch (error) {
      this.setStatus(HttpStatus.HTTP_INTERNAL_SERVER_ERROR);
      return {
        error: error as string,
      };
    }
  }
}

export { ERPController };
